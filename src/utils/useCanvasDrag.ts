import React, { useState } from 'react';
import { EdgeSections } from '../symbols/Edge';
import { NodeData, PortData } from '../types';
import { DragEvent, Position } from './useNodeDrag';

export const useCanvasDrag = ({ onNodeLink, onNodeLinkCheck }) => {
  const [dragNode, setDragNode] = useState<NodeData | null>(null);
  const [dragPort, setDragPort] = useState<NodeData | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<EdgeSections[] | null>(null);
  const [canLinkNode, setCanLinkNode] = useState<boolean | null>(null);

  const onDragStart = (
    _state: DragEvent,
    _initial: Position,
    node: NodeData,
    port?: PortData
  ) => {
    setDragNode(node);
    setDragPort(port);
  };

  const onDrag = (
    { movement: [mx, my], memo: [ox, oy] }: DragEvent,
    [ix, iy]: Position
  ) => {
    setDragCoords([
      {
        startPoint: { x: ix, y: iy },
        endPoint: { x: ix + mx + ox, y: iy + my + oy }
      }
    ]);
  };

  const onDragEnd = () => {
    if (dragNode && enteredNode && canLinkNode) {
      onNodeLink(dragNode, enteredNode, dragPort);
    }

    setDragNode(null);
    setDragPort(null);
    setEnteredNode(null);
    setDragCoords(null);
  };

  const onEnter = (
    _event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    setEnteredNode(node);

    if (dragNode && node) {
      const canLink = onNodeLinkCheck(dragNode, node, dragPort);
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
    dragPort,
    enteredNode,
    onDragStart,
    onDrag,
    onDragEnd,
    onEnter,
    onLeave
  };
};
