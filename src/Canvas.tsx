import React, { FC } from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { useLayout } from './layout';
import { MarkerArrow } from './symbols/Arrow';
import css from './Canvas.module.scss';

export interface NodeData<T = any> {
  id: string;
  x?: number;
  y?: number;
  disabled?: boolean;
  label?: any;
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
  label?: any;
  from?: NodeData | PortData;
  to?: NodeData | PortData;
  data?: T;
  style?: any;
  className?: string;
  arrowHeadType?: any;
}

export interface PortData {
  id: string;
  disabled?: boolean;
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

  onCanvasClick?: () => void;
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;

  onNodeDragStart?: (node: NodeData) => void;
  onNodeDragStop?: (node: NodeData) => void;
  onNodeEnter?: (node: NodeData) => void;
  onNodeLeave?: (node: NodeData) => void;
  onNodeRemove?: (edge: EdgeData) => void;
  onNodeClick?: (node: NodeData) => void;

  onEdgeClick?: (edge: EdgeData) => void;
  onEdgeConnect?: (edge: EdgeData) => void;
  onEdgeRemove?: (edge: EdgeData) => void;
}

export const Canvas: FC<EditorCanvasProps> = ({
  id,
  className,
  snapToGrid = true,
  snapGrid = [15, 15],
  height = '100%',
  width = '100%',
  maxHeight = 2000,
  maxWidth = 2000,
  nodes,
  edges
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
      <div className={css.background} style={{ height: maxHeight, width: maxWidth }} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={genId}
        className={className}
        height={maxHeight}
        width={maxWidth}
      >
        <defs>
          <MarkerArrow />
        </defs>
        <g transform={`translate(${x}, ${y})`}>
          {layout?.children?.map(n => (
            <Node
              key={n.id}
              {...n as NodeProps}
            />
          ))}
          {layout?.edges?.map(e => (
            <Edge
              key={e.id}
              {...e as EdgeProps}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
