import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { ElkRoot, CanvasDirection, useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { CloneElement } from 'rdk';
import { useCanvasDrag } from './utils/useCanvasDrag';
import { checkNodeLinkable } from './utils/helpers';
import { EdgeData, NodeData, PortData } from './types';
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
  pannable?: boolean;
  center?: boolean;

  /*
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  zoomable?: boolean;
  snapToGrid?: boolean;
  snapGrid?: [number, number];
  */

  onLayoutChange: (layout: ElkRoot) => void;
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;

  onNodeLink?: (from: NodeData, to: NodeData, port?: PortData) => void;
  onNodeLinkCheck?: (
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean;

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
  center = true,
  pannable = true,
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
  const { layout, ref, xy, canvasHeight, canvasWidth } = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth,
    direction,
    pannable,
    center,
    onLayoutChange
  });
  const { dragCoords, canLinkNode, enteredNode, ...dragRest } = useCanvasDrag({
    onNodeLink,
    onNodeLinkCheck
  });

  return (
    <div
      style={{ height, width }}
      className={classNames(css.container, className, {
        [css.pannable]: pannable
      })}
      ref={ref}
    >
      <div
        className={css.background}
        style={{ height: canvasHeight, width: canvasWidth }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={id}
        height={canvasHeight}
        width={canvasWidth}
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
              childEdge={edge}
              childNode={node}
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
