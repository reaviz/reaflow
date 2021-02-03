import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { CanvasRef } from '../Canvas';
import { getCoords } from '../utils/helpers';
import { Matrix2D, Point2D } from 'kld-affine';
import { IntersectionQuery } from 'kld-intersections';
import { LayoutNodeData } from '../types';

export interface ProximityProps {
  /**
   * Min distance required before match is made. Default is 40.
   */
  minDistance?: number;

  /**
   * Ref pointer to the canvas.
   */
  canvasRef?: RefObject<CanvasRef>;

  /**
   * When a match state has changed.
   */
  onMatchChange?: (matches: string | null, distance: number | null) => void;
}

export interface ProximityResult {
  /**
   * The matched id of the node.
   */
  match: string | null;

  /**
   * Distance from the match.
   */
  distance: number | null;

  /**
   * Event for drag started.
   */
  onDragStart: (event: PointerEvent) => void;

  /**
   * Event for active dragging.
   */
  onDrag: (event: PointerEvent) => void;

  /**
   * Event for drag ended.
   */
  onDragEnd: (event: PointerEvent) => void;
}

interface PointNode {
  points: Point2D[];
  node: LayoutNodeData;
}

const buildPoints = (nodes: LayoutNodeData[], parent?: LayoutNodeData) => {
  const results: PointNode[] = [];

  if (nodes?.length) {
    for (const node of nodes) {
      let x = node.x;
      let y = node.y;

      // NOTE: If we have a parent, let's update the points
      // to account for the parent's position
      if (parent) {
        x = parent.x + x;
        y = parent.y + y;
      }

      const points = [
        // top-left
        new Point2D(x, y),
        // bottom-right
        new Point2D(x + node.width, y + node.height)
      ];

      results.push({
        points,
        node
      });

      if (node.children?.length) {
        results.push(...buildPoints(node.children, node));
      }
    }
  }

  return results;
};

const distanceFromNode = (mousePoint: Point2D, node: PointNode) => {
  const [tl, br] = node.points;
  let dx = 0;
  let dy = 0;

  // Compute distance to elem in X
  if (mousePoint.x < tl.x) {
    dx = tl.x - mousePoint.x;
  } else if (mousePoint.x > br.x) {
    dx = br.x - mousePoint.x;
  }

  // Compute distance to elem in Y
  if (mousePoint.y < tl.y) {
    dy = tl.y - mousePoint.y;
  } else if (mousePoint.y > br.y) {
    dy = br.y - mousePoint.y;
  }

  return Math.floor(Math.sqrt(dx * dx + dy * dy));
};

const findNodeIntersection = (
  event: PointerEvent,
  matrix: Matrix2D,
  points: PointNode[],
  minDistance: number
) => {
  const cubes = [];
  const mousePoint = new Point2D(event.x, event.y).transform(matrix);

  for (const point of points) {
    // TODO: Make this support other shape types...
    const intersects = IntersectionQuery.pointInRectangle(
      mousePoint,
      point.points[0],
      point.points[1]
    );

    // Calc the distances
    // https://github.com/thelonious/kld-affine/issues/24
    const minDist = distanceFromNode(mousePoint, point);

    cubes.push({
      node: point.node,
      minDist,
      intersects
    });
  }

  let foundDist = minDistance;
  let intersectedNodeId = null;
  let foundNodeId = null;
  for (const cube of cubes) {
    if (cube.minDist < foundDist && !cube.intersects) {
      foundNodeId = cube.node.id;
      foundDist = cube.minDist;
    }

    if (cube.intersects) {
      intersectedNodeId = cube.node.id;
    }
  }

  if (intersectedNodeId) {
    // We are are just inside a node already
    // and there is no closer children ( nested case )
    if (!foundNodeId || foundNodeId === intersectedNodeId) {
      // If we are inside the intersected node and its the
      // closest node, let's reset the distance to 0
      foundNodeId = intersectedNodeId;
      foundDist = 0;
    }
  }

  return {
    foundNodeId,
    foundDist
  };
};

export const useProximity = ({
  canvasRef,
  minDistance = 40,
  onMatchChange
}: ProximityProps) => {
  const [match, setMatch] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [matrix, setMatrix] = useState<Matrix2D | null>(null);
  const lastMatchRef = useRef<string | null>(null);
  const [points, setPoints] = useState<PointNode[] | null>(null);

  const onDragStart = useCallback(() => {
    const ref = canvasRef.current;

    // @ts-ignore
    setMatrix(getCoords(ref));
    setPoints(buildPoints(ref.layout.children));
  }, [canvasRef,]);

  const onDrag = useCallback(
    (event: PointerEvent) => {
      if (!matrix) {
        return;
      }
      const { foundNodeId, foundDist } = findNodeIntersection(event, matrix, points, minDistance);

      if (foundNodeId !== lastMatchRef.current) {
        onMatchChange?.(foundNodeId, foundDist);
      }

      lastMatchRef.current = foundNodeId;
      setMatch(foundNodeId);
      setDistance(foundDist !== minDistance ? foundDist : null);
    },
    [matrix, minDistance, points, onMatchChange]
  );

  const onDragEnd = useCallback(() => {
    setMatch(null);
    setMatrix(null);
    setPoints(null);
  }, []);

  return {
    match,
    distance,
    onDragStart,
    onDrag,
    onDragEnd
  } as ProximityResult;
};
