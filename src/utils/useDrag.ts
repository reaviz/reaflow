import { useCallback, useMemo, useState } from 'react';
import { NodeData } from '../Canvas';

export const useDrag = () => {
  const [activeDrag, setActiveDrag] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<any | null>(null);

  const onDragStart = (event, node) => {
    setActiveDrag(node);
  };

  const onDrag = (event) => {
    const [x, y] = event.offset;
    const endPoint = { x, y };

    setDragCoords([
      {
        startPoint: dragCoords?.[0]?.startPoint || endPoint,
        endPoint
      }
    ]);
  };

  const onDragEnd = (event) => {
    setActiveDrag(null);
    setDragCoords(null);
  };

  return {
    dragCoords,
    activeDrag,
    onDragStart,
    onDrag,
    onDragEnd
  };
};
