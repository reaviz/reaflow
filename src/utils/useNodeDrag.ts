import React, { useState } from 'react';
import { EdgeSections } from '../symbols/Edge';
import { NodeData } from '../types';

export const useNodeDrag = ({ onNodeLink, onNodeLinkCheck }) => {
  const [dragNode, setDragNode] = useState<NodeData | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<EdgeSections[] | null>(null);
  const [canLinkNode, setCanLinkNode] = useState<boolean | null>(null);

  const onDragStart = (_state, _initial, node: NodeData) => {
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
    if (dragNode && enteredNode && canLinkNode) {
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

    if (dragNode && node) {
      const canLink = onNodeLinkCheck(dragNode, node);
      setCanLinkNode(canLink === undefined || canLink ? true : false);
    }
  };

  const onLeave = () => {
    setEnteredNode(null);
    setCanLinkNode(null);
  };

  return {
    dragCoords,
    canLinkNode,
    dragNode,
    enteredNode,
    onDragStart,
    onDrag,
    onDragEnd,
    onEnter,
    onLeave
  };
};
