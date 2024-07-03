import React, { createContext, useContext } from 'react';
import { LayoutResult, useLayout } from '../layout/useLayout';
import { NodeData, PortData } from '../types';
import { EdgeDragResult, useEdgeDrag } from './useEdgeDrag';
import { useZoom, ZoomResult } from './useZoom';

export interface CanvasProviderValue
  extends EdgeDragResult,
    LayoutResult,
    ZoomResult {
  selections?: string[];
  readonly?: boolean;
  pannable: boolean;
  panType: 'scroll' | 'drag'; 
}

export const CanvasContext = createContext<CanvasProviderValue>({} as any);

export interface CanvasProviderProps {
  onNodeLink?: (
    event: any,
    fromNode: NodeData,
    toNode: NodeData,
    fromPort?: PortData
  ) => void;
  onNodeLinkCheck?: (
    event: any,
    fromNode: NodeData,
    toNode: NodeData,
    fromPort?: PortData
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
  fit,
  maxWidth,
  direction,
  layoutOptions,
  pannable,
  panType,
  defaultPosition,
  zoomable,
  zoom,
  minZoom,
  maxZoom,
  onNodeLinkCheck,
  onLayoutChange,
  onZoomChange
}) => {
  const zoomProps = useZoom({
    zoom,
    minZoom,
    maxZoom,
    disabled: !zoomable,
    onZoomChange
  });

  const layoutProps = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth,
    direction,
    pannable,
    panType,
    defaultPosition,
    fit,
    layoutOptions,
    zoom: zoomProps.zoom,
    setZoom: zoomProps.setZoom,
    onLayoutChange
  });

  const dragProps = useEdgeDrag({
    onNodeLink,
    onNodeLinkCheck
  });

  return (
    <CanvasContext.Provider
      value={{
        selections,
        readonly,
        pannable,
        panType,
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
