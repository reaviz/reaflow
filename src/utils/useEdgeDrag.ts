import React, { useCallback, useState } from 'react';
import { EdgeSections } from '../symbols/Edge';
import { NodeData, PortData } from '../types';
import { DragEvent, NodeDragEvents, Position } from './useNodeDrag';
import { Point2D } from 'kld-affine';
import { NodeDragType } from '../symbols/Node';

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

  const onDragStart = useCallback(
    (state: DragEvent, _initial: Position, node: NodeData, port?: PortData) => {
      setDragType(state.dragType);
      setDragNode(node);
      setDragPort(port);
    },
    []
  );

  const onDrag = useCallback(
    ({ memo: [matrix], xy: [x, y] }: DragEvent, [ix, iy]: Position) => {
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
    },
    []
  );

  const onDragEnd = useCallback(
    (event: DragEvent) => {
      if (dragNode && enteredNode && canLinkNode) {
        onNodeLink(event, dragNode, enteredNode, dragPort);
      }

      setDragNode(null);
      setDragPort(null);
      setEnteredNode(null);
      setDragCoords(null);
    },
    [canLinkNode, dragNode, dragPort, enteredNode, onNodeLink]
  );

  const onEnter = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData) => {
      if (dragNode && node) {
        setEnteredNode(node);
        const canLink = onNodeLinkCheck(event, dragNode, node, dragPort);
        const result =
          (canLink === undefined || canLink) &&
          (dragNode.parent === node.parent || dragType === 'node');

        setCanLinkNode(result);
      }
    },
    [dragNode, dragPort, dragType, onNodeLinkCheck]
  );

  const onLeave = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData) => {
      if (dragNode && node) {
        setEnteredNode(null);
        setCanLinkNode(null);
      }
    },
    [dragNode]
  );

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
