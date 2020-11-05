import { useState } from 'react';
import { NodeData } from '../types';

export const useDrag = () => {
  const [activeDrag, setActiveDrag] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<any | null>(null);

  const onDragStart = ({ offset: [x, y] }, node) => {
    const startPoint = { x, y };
    setDragCoords([
      {
        startPoint,
        endPoint: startPoint
      }
    ]);

    setActiveDrag(node);
  };

  const onDrag = ({ offset: [x, y] }) => {
    if (!dragCoords) {
      return;
    }

    const endPoint = { x, y };
    setDragCoords([
      {
        startPoint: dragCoords[0].startPoint,
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
