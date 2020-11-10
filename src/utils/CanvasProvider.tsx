import React, { createContext, useContext } from 'react';
import { NodeData, PortData } from '../types';
import { CanvasDragResult, useCanvasDrag } from './useCanvasDrag';

export interface CanvasProviderValue extends CanvasDragResult {
  selections?: string[];
  readonly?: boolean;
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
  onNodeLinkCheck,
  children
}) => {
  const dragProps = useCanvasDrag({ onNodeLink, onNodeLinkCheck });

  return (
    <CanvasContext.Provider
      value={{
        selections,
        readonly,
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
