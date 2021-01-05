import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { CanvasRef } from '../Canvas';
import { getCoords } from '../utils/helpers';
import { Matrix2D, Point2D } from 'kld-affine';
import { IntersectionQuery } from 'kld-intersections';

export interface ProximityProps {
  minDistance?: number;
  canvasRef?: RefObject<CanvasRef>;
  onMatchChange?: (matches: string | null, distance: number | null) => void;
}

export interface ProximityResult {
  match: string | null;
  distance: number | null;
  onDragStart: (event: PointerEvent) => void;
  onDrag: (event: PointerEvent) => void;
  onDragEnd: (event: PointerEvent) => void;
}

export const useProximity = ({
  canvasRef,
  minDistance = 40,
  onMatchChange
}: ProximityProps) => {
  const [match, setMatch] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [matrix, setMatrix] = useState<Matrix2D | null>(null);
  const lastMatchRef = useRef<string | null>(null);

  const onDragStart = useCallback(() => {
    // @ts-ignore
    setMatrix(getCoords(canvasRef.current));
  }, [canvasRef]);

  const onDrag = useCallback(
    (event: PointerEvent) => {
      if (!matrix) {
        return;
      }

      const cubes = [];
      const layout = canvasRef.current.layout;
      const mousePoint = new Point2D(event.x, event.y).transform(matrix);

      for (const node of layout.children) {
        const points = [
          // top-left
          new Point2D(node.x, node.y),
          // top-right
          new Point2D(node.x + node.width, node.y),
          // bottom-left
          new Point2D(node.x, node.y + node.height),
          // bottom-right
          new Point2D(node.x + node.width, node.y + node.height)
        ];

        // TODO: Make this support other shape types...
        const intersects = IntersectionQuery.pointInRectangle(
          mousePoint,
          points[0],
          points[3]
        );

        // Calc the distances
        const dists: number[] = points.map((p) => mousePoint.distanceFrom(p));
        const minDist = Math.min(...dists);

        cubes.push({
          node,
          minDist,
          intersects
        });
      }

      let foundDist = minDistance;
      let foundNodeId = null;
      for (const cube of cubes) {
        if (cube.minDist < foundDist) {
          foundNodeId = cube.node.id;
          foundDist = cube.minDist;
        }
      }

      if (foundNodeId !== lastMatchRef.current) {
        onMatchChange?.(foundNodeId, foundDist);
      }

      lastMatchRef.current = foundNodeId;
      setMatch(foundNodeId);
      setDistance(foundDist !== minDistance ? foundDist : null);
    },
    [matrix, canvasRef, minDistance, onMatchChange]
  );

  const onDragEnd = useCallback(() => {
    setMatch(null);
  }, []);

  return {
    match,
    distance,
    onDragStart,
    onDrag,
    onDragEnd
  } as ProximityResult;
};
