import React, { useState } from 'react';
import { EdgeSections } from '../symbols/Edge';
import { NodeData, PortData } from '../types';
import { DragEvent, NodeDragEvents, Position } from './useNodeDrag';

export interface EdgeDragResult extends NodeDragEvents {
  dragCoords: EdgeSections[] | null;
  canLinkNode: boolean | null;
  dragNode: NodeData | null;
  dragPort: PortData | null;
  enteredNode: NodeData | null;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: NodeData | PortData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: NodeData | PortData
  ) => void;
}

export const useEdgeDrag = ({
  onNodeLink,
  onNodeLinkCheck
}): EdgeDragResult => {
  const [dragNode, setDragNode] = useState<NodeData | null>(null);
  const [dragPort, setDragPort] = useState<PortData | null>(null);
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
      const result =
        (canLink === undefined || canLink) && dragNode.parent === node.parent;

      setCanLinkNode(result);
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
