import React, { FC, useEffect, useRef } from 'react';
import { useId } from 'rdk';
import { Node } from './symbols/Node';
import { Edge } from './symbols/Edge';
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
  layout = 'manual',
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  // TODO: Subtract node/edge dims from this
  const x = maxWidth / 2;
  const y = maxHeight / 2;

  useEffect(() => {
    const scroller = containerRef.current;
    if (scroller) {
      scroller.scrollTo(
        maxHeight / 2,
        maxWidth / 2
      );
    }
  }, [maxHeight, maxWidth, containerRef]);

  return (
    <div style={{ height, width }} className={css.container} ref={containerRef}>
      <svg
        id={genId}
        className={className}
        height={maxHeight}
        width={maxWidth}
      >
        <g transform={`translate(${x}, ${y})`}>
          {nodes.map(n => (
            <Node
              key={n.id}
              id={n.id}
              x={n.x}
              y={n.y}
              height={50}
              width={50}
            />
          ))}
          {edges.map(n => (
            <Edge
              key={n.id}
              id={n.id}
              from={n.from}
              to={n.to}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
