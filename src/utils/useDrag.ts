import React, { useState } from 'react';
import { NodeData } from '../types';

export const useDrag = ({
  onNodeLink
}) => {
  const [dragNode, setDragNode] = useState<NodeData | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<any | null>(null);

  const onDragStart = ({ movement, offset: [x, y] }, node: NodeData) => {
    setDragCoords([
      {
        startPoint: {
          x,
          y
        },
        endPoint: {
          x: movement[0] + x,
          y: movement[1] + y
        }
      }
    ]);

    setDragNode(node);
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

  const onDragEnd = () => {
    if (dragNode && enteredNode) {
      onNodeLink(dragNode, enteredNode);
    }

    setDragNode(null);
    setEnteredNode(null);
    setDragCoords(null);
  };

  const onEnter = (
    _event: React.MouseEvent<SVGGElement,
    MouseEvent>, node: NodeData
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
