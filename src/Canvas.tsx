import React, {
  FC,
  ReactElement,
  Ref,
  useImperativeHandle,
  forwardRef
} from 'react';
import { useId } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { ElkRoot, CanvasDirection, useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { CloneElement } from 'rdk';
import { EdgeData, NodeData, PortData } from './types';
import classNames from 'classnames';
import { CanvasProvider, useCanvas } from './utils/CanvasProvider';
import css from './Canvas.module.scss';

export interface CanvasProps {
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
  onCanvasZoom?: () => void;
  onCanvasPan?: () => void;
  */

  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLayoutChange: (layout: ElkRoot) => void;
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onNodeLink?: (from: NodeData, to: NodeData, port?: PortData) => void;
  onNodeLinkCheck?: (
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean;

  arrow?: ReactElement<MarkerArrowProps, typeof MarkerArrow>;
  node?: ReactElement<NodeProps, typeof Node>;
  edge?: ReactElement<EdgeProps, typeof Edge>;
  dragEdge?: ReactElement<EdgeProps, typeof Edge>;
}

export interface CanvasRef {
  centerCanvas?: () => void;
}

const InternalCanvas: FC<CanvasProps & { ref?: Ref<CanvasRef> }> = forwardRef(
  (
    {
      className,
      height = '100%',
      width = '100%',
      maxHeight = 2000,
      maxWidth = 2000,
      nodes = [],
      edges = [],
      disabled = false,
      center = true,
      pannable = true,
      direction = 'DOWN',
      arrow = <MarkerArrow />,
      node = <Node />,
      edge = <Edge />,
      dragEdge = <Edge add={null} />,
      onMouseEnter = () => undefined,
      onMouseLeave = () => undefined,
      onCanvasClick = () => undefined,
      onLayoutChange = () => undefined
    },
    ref: Ref<CanvasRef>
  ) => {
    const id = useId();
    const { dragCoords } = useCanvas();
    const {
      layout,
      ref: layoutRef,
      xy,
      canvasHeight,
      canvasWidth,
      centerCanvas
    } = useLayout({
      nodes,
      edges,
      maxHeight,
      maxWidth,
      direction,
      pannable,
      center,
      onLayoutChange
    });

    useImperativeHandle(ref, () => ({
      centerCanvas
    }));

    return (
      <div
        style={{ height, width }}
        className={classNames(css.container, className, {
          [css.pannable]: pannable
        })}
        ref={layoutRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
                disabled={disabled}
                {...(e as EdgeProps)}
              />
            ))}
            {layout?.children?.map(({ children, ...n }) => (
              <CloneElement<NodeProps>
                key={n.id}
                element={node}
                id={`${id}-node-${n.id}`}
                disabled={disabled}
                children={node.props.children}
                nodes={children}
                childEdge={edge}
                childNode={node}
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
  }
);

export const Canvas: FC<CanvasProps & { ref?: Ref<CanvasRef> }> = forwardRef(
  (
    {
      selections = [],
      onNodeLink = () => undefined,
      onNodeLinkCheck = () => undefined,
      ...rest
    },
    ref: Ref<CanvasRef>
  ) => (
    <CanvasProvider
      selections={selections}
      onNodeLink={onNodeLink}
      onNodeLinkCheck={onNodeLinkCheck}
    >
      <InternalCanvas ref={ref} {...rest} />
    </CanvasProvider>
  )
);
