import React, { FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { ElkRoot, CanvasDirection, useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { CloneElement } from 'rdk';
import { useCanvasDrag } from './utils/useCanvasDrag';
import { checkNodeLinkable } from './utils/helpers';
import { EdgeData, NodeData } from './types';
import classNames from 'classnames';
import css from './Canvas.module.scss';

export interface EditorCanvasProps {
  className?: string;
  disabled?: boolean;
  height?: number;
  width?: number;
  maxHeight?: number;
  maxWidth?: number;

  nodes: NodeData[];
  edges: EdgeData[];
  selections?: string[];
  direction?: CanvasDirection;

  /*
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  zoomable?: boolean;
  pannable?: boolean;
  snapToGrid?: boolean;
  snapGrid?: [number, number];
  */

  onLayoutChange: (layout: ElkRoot) => void;
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;

  onNodeLink?: (from: NodeData, to: NodeData) => void;
  onNodeLinkCheck?: (from: NodeData, to: NodeData) => undefined | boolean;

  arrow: ReactElement<MarkerArrowProps, typeof MarkerArrow>;
  node: ReactElement<NodeProps, typeof Node>;
  edge: ReactElement<EdgeProps, typeof Edge>;
  dragEdge: ReactElement<EdgeProps, typeof Edge>;
}

export const Canvas: FC<Partial<EditorCanvasProps>> = ({
  className,
  height = '100%',
  width = '100%',
  maxHeight = 2000,
  maxWidth = 2000,
  nodes,
  edges,
  disabled,
  direction = 'DOWN',
  arrow = <MarkerArrow />,
  node = <Node />,
  edge = <Edge />,
  dragEdge = <Edge add={null} />,
  selections = [],
  onNodeLinkCheck = () => undefined,
  onNodeLink = () => undefined,
  onCanvasClick = () => undefined,
  onLayoutChange = () => undefined
}) => {
  const id = useId();
  const { layout, ref, xy } = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth,
    direction,
    onLayoutChange
  });
  const { dragCoords, canLinkNode, enteredNode, ...dragRest } = useCanvasDrag({ onNodeLink, onNodeLinkCheck });

  return (
    <div style={{ height, width }} className={classNames(css.container, className)} ref={ref}>
      <div
        className={css.background}
        style={{ height: maxHeight, width: maxWidth }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={id}
        height={maxHeight}
        width={maxWidth}
        onClick={onCanvasClick}
      >
        <defs>
          <CloneElement<MarkerArrowProps>
            element={arrow}
            {...(arrow as MarkerArrowProps)}
          />
        </defs>
        <g style={{ transform: `translate(${xy[0]}px, ${xy[1]}px)` }}>
          {layout?.edges?.map((e) => (
            <CloneElement<EdgeProps>
              key={e.id}
              element={edge}
              id={`${id}-edge-${e.id}`}
              isActive={selections.length ? selections.includes(e.id) : null}
              disabled={disabled}
              {...(e as EdgeProps)}
            />
          ))}
          {layout?.children?.map(({ children, ...n }) => (
            <CloneElement<NodeProps>
              key={n.id}
              element={node}
              id={`${id}-node-${n.id}`}
              isActive={selections.length ? selections.includes(n.id) : null}
              isLinkable={checkNodeLinkable(n, enteredNode, canLinkNode)}
              disabled={disabled}
              children={node.props.children}
              nodes={children}
              {...dragRest}
              {...n}
            />
          ))}
          {dragCoords !== null && (
            <CloneElement<EdgeProps>
              element={dragEdge}
              id={`${id}-drag`}
              sections={dragCoords}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </g>
      </svg>
    </div>
  );
};
