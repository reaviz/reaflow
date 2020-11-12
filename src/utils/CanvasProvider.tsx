import { ElkRoot, useLayout } from '../layout/useLayout';
import React, { createContext, RefObject, useContext } from 'react';
import { NodeData, PortData } from '../types';
import { EdgeDragResult, useEdgeDrag } from './useEdgeDrag';
import { useZoom } from './useZoom';

export interface CanvasProviderValue extends EdgeDragResult {
  selections?: string[];
  readonly?: boolean;
  layout?: ElkRoot;
  xy: [number, number];
  containerRef: RefObject<HTMLDivElement>;
  svgRef: RefObject<SVGSVGElement>;
  canvasHeight: number;
  canvasWidth: number;
  containerHeight: number;
  containerWidth: number;
  scale: number;
  pannable: boolean;
  centerCanvas: () => void;
}

export const CanvasContext = createContext<CanvasProviderValue>({} as any);

export interface CanvasProviderProps {
  onNodeLink?: (from: NodeData, to: NodeData, port?: PortData) => void;
  onNodeLinkCheck?: (
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean;
}

export const CanvasProvider = ({
  selections,
  onNodeLink,
  readonly,
  children,
  nodes,
  edges,
  maxHeight,
  maxWidth,
  direction,
  pannable,
  center,
  zoomable,
  scale,
  onNodeLinkCheck,
  onLayoutChange,
  onZoomChange
}) => {
  const zoomProps= useZoom({
    scale,
    disabled: !zoomable,
    onZoomChange
  });

  const dragProps = useEdgeDrag({
    scale: zoomProps.scale,
    onNodeLink,
    onNodeLinkCheck
  });

  const layoutProps = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth,
    direction,
    pannable,
    center,
    onLayoutChange
  });

  return (
    <CanvasContext.Provider
      value={{
        selections,
        readonly,
        pannable,
        ...layoutProps,
        ...zoomProps,
        ...dragProps
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);

  if (context === undefined) {
    throw new Error(
      '`useCanvas` hook must be used within a `CanvasContext` component'
    );
  }

  return context;
};
