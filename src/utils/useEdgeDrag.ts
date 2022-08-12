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
  enteredPort: PortData | null;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    nodeData: NodeData,
    portData?: PortData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    nodeData: NodeData,
    portData?: PortData
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
  const [enteredPort, setEnteredPort] = useState<PortData | null>(null);
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
        onNodeLink(event, dragNode, enteredNode, dragPort, enteredPort);
      }

      setDragNode(null);
      setDragPort(null);
      setEnteredNode(null);
      setEnteredPort(null);
      setDragCoords(null);
    },
    [canLinkNode, dragNode, dragPort, enteredNode, enteredPort, onNodeLink]
  );

  const onEnter = useCallback(
    (
      event: React.MouseEvent<SVGGElement, MouseEvent>,
      node: NodeData,
      port?: PortData
    ) => {
      console.log(node, port, 'NODDDE entre');
      if (dragNode && node) {
        setEnteredNode(node);
        setEnteredPort(port);
        const canLink = onNodeLinkCheck(event, dragNode, node, dragPort, port);
        const result =
          (canLink === undefined || canLink) &&
          (dragNode.parent === node.parent || dragType === 'node');

        setCanLinkNode(result);
      }
    },
    [dragNode, dragPort, dragType, onNodeLinkCheck]
  );

  const onLeave = useCallback(
    (
      event: React.MouseEvent<SVGGElement, MouseEvent>,
      node: NodeData,
      port?: PortData
    ) => {
      if (dragNode && node) {
        setEnteredNode(null);
        setCanLinkNode(null);
      }

      if (dragPort && port) {
        setEnteredPort(null);
        setCanLinkNode(null);
      }
    },
    [dragNode, dragPort]
  );

  return {
    dragCoords,
    canLinkNode,
    dragNode,
    dragPort,
    enteredNode,
    enteredPort,
    onDragStart,
    onDrag,
    onDragEnd,
    onEnter,
    onLeave
  };
};
