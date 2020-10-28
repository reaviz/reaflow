import React, { FC } from 'react';
import { useId } from 'rdk';
import useDimensions from 'react-cool-dimensions';

export interface Node<T = any> {
  id: string;
  parent?: Node;
  edges?: Edge[];
  ports?: Port[];
  data?: T;
}

export interface Edge<T = any> {
  id: string;
  from?: Node | Port;
  to?: Node | Port;
  data?: T;
}

export interface Port {
  id: string;
}

export interface EditorCanvasProps {
  nodes: Node[];
  edges: Edge[];
  layout?: 'elk' | 'manual';
  id?: string;
  className?: string;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  disabled?: boolean;
  height?: number;
  width?: number;
  maxHeight?: number;
  maxWidth?: number;
}

export const Canvas: FC<EditorCanvasProps> = ({
  id,
  className,
  layout = 'manual',
  height = '100%',
  width = '100%',
  maxHeight = 2000,
  maxWidth = 2000
}) => {
  const genId = useId(id);
  const { ref, width: svgWidth, height: svgHeight } = useDimensions<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height, width }}>
      <svg
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
