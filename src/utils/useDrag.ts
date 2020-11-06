import React, { useState } from 'react';
import { NodeData } from '../types';

export const useDrag = ({ onNodeLink }) => {
  const [dragNode, setDragNode] = useState<NodeData | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<any | null>(null);

  const onDragStart = (state, initial, node: NodeData) => {
    setDragNode(node);
  };

  const onDrag = ({ movement: [mx, my], memo: [ox, oy] }, [ix, iy]) => {
    setDragCoords([
      {
        startPoint: { x: ix, y: iy },
        endPoint: { x: ix + mx + ox, y: iy + my + oy }
      }
    ]);
  };

  const onDragEnd = () => {
    if (dragNode && enteredNode) {
      onNodeLink(dragNode, enteredNode);
    }

    setDragNode(null);
    setEnteredNode(null);
    setDragCoords(null);
  };

  const onEnter = (
    _event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    setEnteredNode(node);
  };

  const onLeave = () => {
    setEnteredNode(null);
  };

  return {
    dragCoords,
    activeNode: dragNode,
    enteredNode,
    onDragStart,
    onDrag,
    onDragEnd,
    onEnter,
    onLeave
  };
};
