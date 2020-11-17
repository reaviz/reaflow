import React, {
  FC,
  ReactElement,
  Ref,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef
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
import { motion } from 'framer-motion';

export interface CanvasContainerProps extends CanvasProps {
  nodes?: NodeData[];
  edges?: EdgeData[];
  selections?: string[];
  direction?: CanvasDirection;
  pannable?: boolean;
  zoomable?: boolean;
  center?: boolean;
  fit?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;

  onNodeLink?: (from: NodeData, to: NodeData, port?: PortData) => void;
  onNodeLinkCheck?: (
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean;
  onZoomChange?: (zoom: number) => void;
  onLayoutChange?: (layout: ElkRoot) => void;
}

export interface CanvasProps {
  className?: string;
  disabled?: boolean;
  height?: number;
  width?: number;
  readonly?: boolean;

  dragEdge?: ReactElement<EdgeProps, typeof Edge>;
  arrow?: ReactElement<MarkerArrowProps, typeof MarkerArrow>;
  node?:
    | ReactElement<NodeProps, typeof Node>
    | ((node: NodeProps) => ReactElement<NodeProps, typeof Node>);
  edge?:
    | ReactElement<EdgeProps, typeof Edge>
    | ((edge: EdgeProps) => ReactElement<NodeProps, typeof Edge>);

  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}

export interface CanvasRef {
  centerCanvas?: () => void;
  fitCanvas?: () => void;
  setZoom?: (factor: number) => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
}

const InternalCanvas: FC<CanvasProps & { ref?: Ref<CanvasRef> }> = forwardRef(
  (
    {
      className,
      height = '100%',
      width = '100%',
      readonly,
      disabled = false,
      arrow = <MarkerArrow />,
      node = <Node />,
      edge = <Edge />,
      dragEdge = <Edge add={null} />,
      onMouseEnter = () => undefined,
      onMouseLeave = () => undefined,
      onCanvasClick = () => undefined
    },
    ref: Ref<CanvasRef>
  ) => {
    const id = useId();
    const {
      pannable,
      dragCoords,
      layout,
      containerRef,
      svgRef,
      canvasHeight,
      canvasWidth,
      xy,
      zoom: scale,
      setZoom,
      zoomIn,
      zoomOut,
      centerCanvas,
      fitCanvas
    } = useCanvas();

    useImperativeHandle(ref, () => ({
      centerCanvas,
      setZoom,
      zoomIn,
      zoomOut,
      fitCanvas
    }));

    const renderNode = useCallback(
      ({ children, ...n }) => {
        const element = typeof node === 'function' ? node(n) : node;
        return (
          <CloneElement<NodeProps>
            key={n.id}
            element={element}
            id={`${id}-node-${n.id}`}
            disabled={disabled}
            children={element.props.children}
            nodes={children}
            childEdge={edge}
            childNode={node}
            {...n}
          />
        );
      },
      [node, edge, disabled, id]
    );

    const renderEdge = useCallback(
      (e) => {
        const element = typeof edge === 'function' ? edge(e) : edge;
        return (
          <CloneElement<EdgeProps>
            key={e.id}
            element={element}
            id={`${id}-edge-${e.id}`}
            disabled={disabled}
            {...(e as EdgeProps)}
          />
        );
      },
      [edge, disabled, id]
    );

    const mount = useRef<boolean>(false);
    useLayoutEffect(() => {
      if (!mount.current && layout !== null && xy[0] > 0 && xy[1] > 0) {
        mount.current = true;
      }
    }, [layout, xy]);

    return (
      <div
        style={{ height, width }}
        className={classNames(css.container, className, {
          [css.pannable]: pannable
        })}
        ref={containerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id={id}
          ref={svgRef}
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
          <motion.g
            initial={{
              opacity: 0,
              scale: 0,
              transition: {
                translateX: false,
                translateY: false
              }
            }}
            animate={{
              opacity: 1,
              translateX: xy[0],
              translateY: xy[1],
              scale,
              transition: {
                velocity: 100,
                translateX: { duration: mount.current ? 0.3 : 0 },
                translateY: { duration: mount.current ? 0.3 : 0 },
                opacity: { duration: 0.8 },
                when: 'beforeChildren'
              }
            }}
          >
            {layout?.edges?.map(renderEdge)}
            {layout?.children?.map(renderNode)}
            {dragCoords !== null && !readonly && (
              <CloneElement<EdgeProps>
                element={dragEdge}
                id={`${id}-drag`}
                disabled={true}
                sections={dragCoords}
              />
            )}
          </motion.g>
        </svg>
      </div>
    );
  }
);

export const Canvas: FC<
  CanvasContainerProps & { ref?: Ref<CanvasRef> }
> = forwardRef(
  (
    {
      selections = [],
      readonly = false,
      fit = false,
      nodes = [],
      edges = [],
      maxHeight = 2000,
      maxWidth = 2000,
      direction = 'DOWN',
      pannable = true,
      zoom = 1,
      center = true,
      zoomable = true,
      minZoom = -0.5,
      maxZoom = 1,
      onNodeLink = () => undefined,
      onNodeLinkCheck = () => undefined,
      onLayoutChange = () => undefined,
      onZoomChange = () => undefined,
      ...rest
    },
    ref: Ref<CanvasRef>
  ) => (
    <CanvasProvider
      nodes={nodes}
      edges={edges}
      zoom={zoom}
      center={center}
      minZoom={minZoom}
      maxZoom={maxZoom}
      fit={fit}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      direction={direction}
      pannable={pannable}
      zoomable={zoomable}
      readonly={readonly}
      onLayoutChange={onLayoutChange}
      selections={selections}
      onZoomChange={onZoomChange}
      onNodeLink={onNodeLink}
      onNodeLinkCheck={onNodeLinkCheck}
    >
      <InternalCanvas ref={ref} {...rest} />
    </CanvasProvider>
  )
);
