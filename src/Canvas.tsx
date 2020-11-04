import React, { FC, Fragment, ReactElement } from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { CloneElement } from 'rdk';
import css from './Canvas.module.scss';

export interface NodeData<T = any> {
  id: string;
  x?: number;
  y?: number;
  disabled?: boolean;
  text?: any;
  height?: number;
  width?: number;
  parent?: NodeData;
  edges?: EdgeData[];
  ports?: PortData[];
  data?: T;
  style?: any;
  className?: string;
  hidden?: boolean;
}

export interface EdgeData<T = any> {
  id: string;
  disabled?: boolean;
  text?: any;
  from?: string;
  to?: string;
  data?: T;
  style?: any;
  className?: string;
  arrowHeadType?: any;
}

export interface PortData {
  id: string;
}

export interface EditorCanvasProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  height?: number;
  width?: number;
  maxHeight?: number;
  maxWidth?: number;

  nodes: NodeData[];
  edges: EdgeData[];
  layout?: 'elk' | 'manual';

  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  zoomable?: boolean;
  pannable?: boolean;

  snapToGrid?: boolean;
  snapGrid?: [number, number];

  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;

  arrow: ReactElement<MarkerArrowProps, typeof MarkerArrow>[];
  node: ReactElement<NodeProps, typeof Node>;
  edge: ReactElement<EdgeProps, typeof Edge>;
}

export const Canvas: FC<Partial<EditorCanvasProps>> = ({
  id,
  className,
  height = '100%',
  width = '100%',
  maxHeight = 2000,
  maxWidth = 2000,
  nodes,
  edges,
  arrow = <MarkerArrow />,
  node = <Node />,
  edge = <Edge />,
  onCanvasClick = () => undefined
}) => {
  const genId = useId(id);
  const { layout, x, y, ref } = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth
  });

  return (
    <div style={{ height, width }} className={css.container} ref={ref}>
      <div
        className={css.background}
        style={{ height: maxHeight, width: maxWidth }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={genId}
        className={className}
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
        <g transform={`translate(${x}, ${y})`}>
          {layout?.children?.map((n) => (
            <CloneElement<NodeProps>
              key={n.id}
              element={node}
              {...(n as NodeProps)}
            />
          ))}
          {layout?.edges?.map((e) => (
            <CloneElement<EdgeProps>
              key={e.id}
              element={edge}
              {...(e as EdgeProps)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
