import React, { FC } from 'react';
import { useId } from 'rdk';
import useDimensions from 'react-cool-dimensions';
import { usePanZoom } from 'utils/usePanZoom';

export interface Node<T = any> {
  id: string;
  x?: number;
  y?: number;
  disabled?: boolean;
  label?: any;
  parent?: Node;
  edges?: Edge[];
  ports?: Port[];
  data?: T;
  style?: any;
  className?: string;
  hidden?: boolean;
}

export interface Edge<T = any> {
  id: string;
  disabled?: boolean;
  label?: any;
  from?: Node | Port;
  to?: Node | Port;
  data?: T;
  style?: any;
  className?: string;
  arrowHeadType?: any;
}

export interface Port {
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

  nodes: Node[];
  edges: Edge[];
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

  onNodeDragStart?: (node: Node) => void;
  onNodeDragStop?: (node: Node) => void;
  onNodeEnter?: () => void;
  onNodeLeave?: () => void;
  onNodeRemove?: (edge: Edge) => void;
  onNodeClick?: (node: Node) => void;

  onEdgeDrag?: () => void;
  onEdgeDragStop?: () => void;
  onEdgeClick?: (edge: Edge) => void;
  onEdgeConnect?: (edge: Edge) => void;
  onEdgeRemove?: (edge: Edge) => void;
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
  maxWidth = 2000
}) => {
  const genId = useId(id);
  const { ref, width: svgWidth, height: svgHeight } = useDimensions<HTMLDivElement>();
  const [svgRef] = usePanZoom();

  return (
    <div ref={ref} style={{ height, width }}>
      <svg
        ref={svgRef}
        id={genId}
        className={className}
        height={svgHeight}
        width={svgWidth}
        style={{ height: maxHeight, width: maxWidth }}
      >
        {height > 0 && width > 0 && (
          <g></g>
        )}
      </svg>
    </div>
  );
};
