import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { CanvasRef } from '../Canvas';
import { getCoords } from '../utils/helpers';
import { Matrix2D, Point2D } from 'kld-affine';
import { IntersectionQuery } from 'kld-intersections';
import { LayoutNodeData } from '../types';

export interface ProximityProps {
  /**
   * Disable proximity or not.
   */
  disabled?: boolean;

  /**
   * Min distance required before match is made. Default is 40.
   */
  minDistance?: number;

  /**
   * Ref pointer to the canvas.
   */
  canvasRef?: RefObject<CanvasRef>;

  /**
   * Distance from the match.
   */
  onDistanceChange?: (distance: number | null) => void;

  /**
   * When a match state has changed.
   */
  onMatchChange?: (matche: string | null, distance: number | null) => void;

  /**
   * When the pointer intersects a node.
   */
  onIntersects?: (matche: string | null) => void;
}

export interface ProximityResult {
  /**
   * The matched id of the node.
   */
  match: string | null;

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
    intersectedNodeId,
    foundNodeId,
    foundDist
  };
};

export const useProximity = ({
  canvasRef,
  disabled,
  minDistance = 40,
  onMatchChange,
  onIntersects,
  onDistanceChange
}: ProximityProps) => {
  const lastIntersectRef = useRef<string | null>(null);
  const lastMatchRef = useRef<string | null>(null);
  const lastDistance = useRef<number | null>(null);
  const frame = useRef<number>(0);

  const [match, setMatch] = useState<string | null>(null);
  const [matrix, setMatrix] = useState<Matrix2D | null>(null);
  const [points, setPoints] = useState<PointNode[] | null>(null);

  const onDragStart = useCallback(() => {
    if (disabled) {
      return;
    }

    const ref = canvasRef.current;

    // @ts-ignore
    setMatrix(getCoords(ref));
    setPoints(buildPoints(ref.layout.children));
  }, [canvasRef, disabled]);

  const onDrag = useCallback(
    (event: PointerEvent) => {
      if (!matrix || disabled) {
        return;
      }

      const {
        intersectedNodeId,
        foundNodeId,
        foundDist
      } = findNodeIntersection(event, matrix, points, minDistance);
      const nextDist = foundDist !== minDistance ? foundDist : null;

      if (foundNodeId !== lastMatchRef.current) {
        onMatchChange?.(foundNodeId, foundDist);
      }

      if (intersectedNodeId !== lastIntersectRef.current) {
        onIntersects?.(intersectedNodeId);
      }

      if (onDistanceChange && nextDist !== lastDistance.current) {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          onDistanceChange(nextDist);
        });
      }

      // Hold these in refs for race cases
      lastIntersectRef.current = intersectedNodeId;
      lastMatchRef.current = foundNodeId;
      lastDistance.current = nextDist;

      setMatch(foundNodeId);
    },
    [matrix, disabled, minDistance, points, onMatchChange, onIntersects, onDistanceChange]
  );

  useEffect(() => {
    return () => cancelAnimationFrame(frame.current);
  });

  const onDragEnd = useCallback(() => {
    if (!disabled) {
      setMatch(null);
      setMatrix(null);
      setPoints(null);
    }
  }, [disabled]);

  return {
    match,
    onDragStart,
    onDrag,
    onDragEnd
  } as ProximityResult;
};
