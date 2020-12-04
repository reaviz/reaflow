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
import { useId, CloneElement } from 'rdk';
import { Node, NodeProps } from './symbols/Node';
import { Edge, EdgeProps } from './symbols/Edge';
import { ElkRoot, CanvasDirection, useLayout } from './layout';
import { MarkerArrow, MarkerArrowProps } from './symbols/Arrow';
import { EdgeData, NodeData, PortData } from './types';
import classNames from 'classnames';
import { CanvasProvider, useCanvas } from './utils/CanvasProvider';
import { motion } from 'framer-motion';
import css from './Canvas.module.scss';

export interface CanvasContainerProps extends CanvasProps {
  /**
   * Nodes to render on the canvas.
   */
  nodes?: NodeData[];

  /**
   * Edges to render on the canvas.
   */
  edges?: EdgeData[];

  /**
   * Key of node/edge ids for selection.
   */
  selections?: string[];

  /**
   * Direction of the canvas layout.
   */
  direction?: CanvasDirection;

  /**
   * Whether the canvas is pannable or not.
   */
  pannable?: boolean;

  /**
   * Whether the canvas is zoomable or not.
   */
  zoomable?: boolean;

  /**
   * Center the canvas on load or not.
   */
  center?: boolean;

  /**
   * Fit the canvas on load.
   */
  fit?: boolean;

  /**
   * Max height of the canvas scrollable area.
   */
  maxHeight?: number;

  /**
   * Max width of the canvas scrollable area.
   */
  maxWidth?: number;

  /**
   * Zoom factor.
   */
  zoom?: number;

  /**
   * Min zoom factor.
   */
  minZoom?: number;

  /**
   * Max zoom factor.
   */
  maxZoom?: number;

  /**
   * ELKJS Layout Options
   */
  layoutOptions?: any;

  /**
   * Callback to check if a node is linkable or not.
   */
  onNodeLink?: (from: NodeData, to: NodeData, port?: PortData) => void;

  /**
   * Callback when a node is linked.
   */
  onNodeLinkCheck?: (
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean;

  /**
   * When the zoom changes.
   */
  onZoomChange?: (zoom: number) => void;

  /**
   * When the layout changes.
   */
  onLayoutChange?: (layout: ElkRoot) => void;
}

export interface CanvasProps {
  /**
   * CSS classname for the container.
   */
  className?: string;

  /**
   * Disable all events or not.
   */
  disabled?: boolean;

  /**
   * Static height of the canvas.
   */
  height?: number;

  /**
   * Static width of the canvas.
   */
  width?: number;

  /**
   * Whether you can drag connections or not.
   */
  readonly?: boolean;

  /**
   * Element of the draw edge.
   */
  dragEdge?: ReactElement<EdgeProps, typeof Edge>;

  /**
   * Arrow shown on the edges.
   */
  arrow?: ReactElement<MarkerArrowProps, typeof MarkerArrow>;

  /**
   * Node or node callback to return element.
   */
  node?:
    | ReactElement<NodeProps, typeof Node>
    | ((node: NodeProps) => ReactElement<NodeProps, typeof Node>);

  /**
   * Edge or edge callback to return element.
   */
  edge?:
    | ReactElement<EdgeProps, typeof Edge>
    | ((edge: EdgeProps) => ReactElement<NodeProps, typeof Edge>);

  /**
   * When the canvas had a mouse enter.
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  /**
   * When the canvas had a mouse leave.
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  /**
   * When the canvas was clicked.
   */
  onCanvasClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}

export interface CanvasRef {
  /**
   * Center the canvas.
   */
  centerCanvas?: () => void;

  /**
   * Fit the canvas.
   */
  fitCanvas?: () => void;

  /**
   * Set a zoom factor of the canvas.
   */
  setZoom?: (factor: number) => void;

  /**
   * Zoom in on the canvas.
   */
  zoomIn?: () => void;

  /**
   * Zoom out on the canvas.
   */
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
      zoom,
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
      (e: EdgeProps) => {
        const element = typeof edge === 'function' ? edge(e) : edge;
        return (
          <CloneElement<EdgeProps>
            key={e.id}
            element={element}
            id={`${id}-edge-${e.id}`}
            disabled={disabled}
            {...e}
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
          {arrow !== null && (
            <defs>
              <CloneElement<MarkerArrowProps>
                element={arrow}
                {...(arrow as MarkerArrowProps)}
              />
            </defs>
          )}
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
              scale: zoom,
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
      layoutOptions,
      ...rest
    },
    ref: Ref<CanvasRef>
  ) => (
    <CanvasProvider
      layoutOptions={layoutOptions}
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
