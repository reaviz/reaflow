import React, { useState } from 'react';
import { EdgeSections } from '../symbols/Edge';
import { NodeData, PortData } from '../types';
import { DragEvent, NodeDragEvents, Position } from './useNodeDrag';
import { Point2D } from 'kld-affine';
import { NodeDragType } from 'symbols/Node';

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
  const [dragType, setDragType] = useState<NodeDragType | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [dragCoords, setDragCoords] = useState<EdgeSections[] | null>(null);
  const [canLinkNode, setCanLinkNode] = useState<boolean | null>(null);

  const onDragStart = (
    state: DragEvent,
    _initial: Position,
    node: NodeData,
    port?: PortData
  ) => {
    setDragType(state.dragType);
    setDragNode(node);
    setDragPort(port);
  };

  const onDrag = (
    { memo: [matrix], xy: [x, y] }: DragEvent,
    [ix, iy]: Position
  ) => {
    const endPoint = new Point2D(x, y).transform(matrix);
    setDragCoords([
      {
        startPoint: {
          x: ix,
          y: iy
        },
        endPoint
      }
    ]);
  };

  const onDragEnd = (event: DragEvent) => {
    if (dragNode && enteredNode && canLinkNode) {
      onNodeLink(event, dragNode, enteredNode, dragPort);
    }

    setDragNode(null);
    setDragPort(null);
    setEnteredNode(null);
    setDragCoords(null);
  };

  const onEnter = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    setEnteredNode(node);

    if (dragNode && node) {
      const canLink = onNodeLinkCheck(event, dragNode, node, dragPort);
      const result =
        (canLink === undefined || canLink) &&
        (dragNode.parent === node.parent || dragType === 'node');

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
