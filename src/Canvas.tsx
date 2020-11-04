import React, { FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { ElkRoot, useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { CloneElement } from 'rdk';
import { useDrag } from './utils/useDrag';
import { EdgeData, NodeData } from './types';
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
  layout?: 'elk' | 'manual';

  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  zoomable?: boolean;
  pannable?: boolean;

  snapToGrid?: boolean;
  snapGrid?: [number, number];

  onLayoutChange: (layout: ElkRoot) => void;
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;

  selections?: string[];

  arrow: ReactElement<MarkerArrowProps, typeof MarkerArrow>;
  node: ReactElement<NodeProps, typeof Node>;
  edge: ReactElement<EdgeProps, typeof Edge>;
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
  arrow = <MarkerArrow />,
  node = <Node />,
  edge = <Edge />,
  selections = [],
  onCanvasClick = () => undefined,
  onLayoutChange = () => undefined
}) => {
  const id = useId();
  const { layout, ref } = useLayout({
    nodes,
    edges,
    maxHeight,
    maxWidth,
    onLayoutChange
  });
  const { dragCoords, ...dragRest } = useDrag();

  return (
    <div style={{ height, width }} className={css.container} ref={ref}>
      <div
        className={css.background}
        style={{ height: maxHeight, width: maxWidth }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={id}
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
        <g style={{ transform: 'translate(50%, 50%)' }}>
          {layout?.edges?.map((e) => (
            <CloneElement<EdgeProps>
              key={e.id}
              element={edge}
              id={`${id}-edge`}
              isActive={selections.length > 0 ? selections.includes(e.id) : null}
              {...(e as EdgeProps)}
            />
          ))}
          {layout?.children?.map((n) => (
            <CloneElement<NodeProps>
              key={n.id}
              element={node}
              id={`${id}-node`}
              isActive={selections.length > 0 ? selections.includes(n.id) : null}
              disabled={disabled}
              {...dragRest}
              {...(n as NodeProps)}
            />
          ))}
          {dragCoords !== null && (
            <CloneElement<EdgeProps>
              element={edge}
              id={`${id}-drag`}
              sections={dragCoords}
            />
          )}
        </g>
      </svg>
    </div>
  );
};
