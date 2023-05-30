import React, {
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { EdgeData, NodeData, PortData } from '../../types';
import { CloneElement } from 'rdk';
import { Icon, IconProps } from '../Icon';
import classNames from 'classnames';
import { Remove, RemoveProps } from '../Remove';
import {
  NodeDragEvents,
  DragEvent,
  useNodeDrag,
  Position
} from '../../utils/useNodeDrag';
import { Edge, EdgeProps } from '../Edge';
import { useCanvas } from '../../utils/CanvasProvider';
import { checkNodeLinkable } from '../../utils/helpers';
import css from './Node.module.css';

export interface NodeChildProps {
  height: number;
  width: number;
  x: number;
  y: number;
  node: NodeData;
  nodes?: NodeData[];
  edges?: EdgeData[];
}

export type NodeDragType = 'node' | 'port' | 'multiportOnly' | 'all';

export type NodeChildrenAsFunction = (
  nodeChildProps: NodeChildProps
) => ReactNode;

export interface NodeProps<T = any>
  extends NodeDragEvents<NodeData<T>, PortData> {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
  offsetX?: number;
  offsetY?: number;
  disabled?: boolean;
  ports?: PortProps[];
  labels?: LabelProps[];
  properties: NodeData<T>;
  className?: string;
  style?: any;
  children?: ReactNode | NodeChildrenAsFunction;
  parent?: string;
  animated?: boolean;
  draggable?: boolean;
  linkable?: boolean;
  selectable?: boolean;
  removable?: boolean;
  dragType?: NodeDragType;
  dragCursor?: string;

  nodes?: NodeData[];
  edges?: EdgeData[];

  onRemove?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;

  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: NodeData
  ) => void;

  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>, data: NodeData) => void;

  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;

  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;

  childNode?:
    | ReactElement<NodeProps, typeof Node>
    | ((node: NodeProps) => ReactElement<NodeProps, typeof Node>);

  childEdge?:
    | ReactElement<EdgeProps, typeof Edge>
    | ((edge: EdgeProps) => ReactElement<NodeProps, typeof Edge>);

  remove: ReactElement<RemoveProps, typeof Remove>;
  icon: ReactElement<IconProps, typeof Icon>;
  label: ReactElement<LabelProps, typeof Label>;
  port: ReactElement<PortProps, typeof Port>;
}

export const Node: FC<Partial<NodeProps>> = ({
  id,
  x,
  y,
  ports,
  labels,
  height,
  width,
  properties,
  animated,
  className,
  rx = 2,
  ry = 2,
  offsetX = 0,
  offsetY = 0,
  icon,
  disabled,
  style,
  children,
  nodes,
  edges,
  draggable = true,
  linkable = true,
  selectable = true,
  removable = true,
  dragType = 'multiportOnly',
  dragCursor = 'crosshair',
  childEdge = <Edge />,
  childNode = <Node />,
  remove = <Remove />,
  port = <Port />,
  label = <Label />,
  onRemove,
  onDrag,
  onDragStart,
  onDragEnd,
  onClick,
  onKeyDown,
  onEnter,
  onLeave
}) => {
  const nodeRef = useRef<SVGRectElement | null>(null);
  const controls = useAnimation();
  const { canLinkNode, enteredNode, selections, readonly, ...canvas } =
    useCanvas();
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isLinkable, setIsLinkable] = useState<boolean>(true);
  const isActive = selections?.length
    ? selections.includes(properties.id)
    : null;
  const isNodeDrag = id.includes('node-drag');
  const newX = x + offsetX;
  const newY = y + offsetY;
  const isMultiPort =
    dragType === 'multiportOnly' &&
    ports?.filter((p) => !p.properties?.hidden).length > 1;
  const isDisabled = disabled || properties?.disabled;
  const canDrag = ['port', 'multiportOnly'].includes(dragType)
    ? linkable
    : draggable;
  const canSelect = selectable && !properties?.selectionDisabled;

  const getDragType = useCallback(
    (hasPort: boolean) => {
      let activeDragType: NodeDragType = null;
      if (!hasPort) {
        if (dragType === 'all' || dragType === 'node') {
          activeDragType = 'node';
        } else if (!isMultiPort) {
          activeDragType = 'port';
        }
      } else {
        if (dragType === 'all' || dragType === 'port' || isMultiPort) {
          activeDragType = 'port';
        }
      }
      return activeDragType;
    },
    [dragType, isMultiPort]
  );

  const setDragCursor = useCallback((dragType: NodeDragType | null) => {
    if (dragType) {
      document.body.classList.add('dragging');
      document.body.style.cursor = dragType === 'node' ? 'grab' : 'crosshair';
    } else {
      document.body.classList.remove('dragging');
      document.body.style.cursor = 'auto';
    }
  }, []);

  const bind = useNodeDrag({
    x: newX,
    y: newY,
    height,
    width,
    disabled:
      isDisabled || isMultiPort || readonly || !canDrag || dragType === 'port',
    node: properties,
    onDrag: (...props) => {
      if (!isDisabled && canDrag) {
        canvas.onDrag(...props);
        onDrag?.(...props);
      }
    },
    onDragStart: (event, coords, node, port) => {
      if (!isDisabled && canDrag) {
        // @ts-ignore
        event.dragType = getDragType(false);
        // @ts-ignore
        setDragCursor(event.dragType);

        canvas.onDragStart(event, coords, node, port);
        onDragStart?.(event, coords, node, port);
        setDragging(true);
      }
    },
    onDragEnd: (event, coords, node, port) => {
      if (!isDisabled && canDrag) {
        // @ts-ignore
        event.dragType = getDragType(false);
        // @ts-ignore
        event.srcElement = nodeRef.current;

        canvas.onDragEnd(event, coords, node, port);
        onDragEnd?.(event, coords, node, port);
        setDragging(false);
        setDragCursor(null);
      }
    }
  });

  useEffect(() => {
    if (enteredNode?.id === properties.id) {
      setIsLinkable(checkNodeLinkable(properties, enteredNode, canLinkNode));
    }

    return () => setIsLinkable(true);
  }, [canLinkNode, enteredNode, properties]);

  useEffect(() => {
    controls.set({
      opacity: 1,
      translateX: x,
      translateY: y
    });
  }, [controls, x, y]);

  const nodeChildProps: NodeChildProps = {
    height,
    width,
    x,
    y,
    node: properties,
    nodes,
    edges
  };

  const onClickCallback = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isDisabled && canSelect) {
        onClick?.(event, properties);
      }
    },
    [canSelect, isDisabled, onClick, properties]
  );

  const onKeyDownCallback = useCallback(
    (event) => {
      event.preventDefault();
      if (!isDisabled) {
        onKeyDown?.(event, properties);
      }
    },
    [isDisabled, onKeyDown, properties]
  );

  const onTouchStartCallback = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const onMouseEnterCallback = useCallback(
    (event) => {
      event.stopPropagation();
      canvas.onEnter(event, properties);
      if (!isDisabled) {
        onEnter?.(event, properties);
      }
    },
    [canvas, isDisabled, onEnter, properties]
  );

  const onMouseLeaveCallback = useCallback(
    (event) => {
      event.stopPropagation();
      canvas.onLeave(event, properties);
      if (!isDisabled) {
        onLeave?.(event, properties);
      }
    },
    [canvas, isDisabled, onLeave, properties]
  );

  const onDragStartCallback = useCallback(
    (event: DragEvent, initial: Position, data: PortData) => {
      if (!isDisabled && linkable) {
        // @ts-ignore
        event.dragType = getDragType(true);
        // @ts-ignore
        setDragCursor(event.dragType);

        canvas.onDragStart(event, initial, properties, data);
        onDragStart?.(event, initial, properties, data);
        setDragging(true);
      }
    },
    [
      canvas,
      getDragType,
      isDisabled,
      linkable,
      onDragStart,
      properties,
      setDragCursor
    ]
  );

  const onDragCallback = useCallback(
    (event: DragEvent, initial: Position, data: PortData) => {
      if (!isDisabled && linkable) {
        canvas.onDrag(event, initial, properties, data);
        onDrag?.(event, initial, properties, data);
      }
    },
    [canvas, isDisabled, linkable, onDrag, properties]
  );

  const onDragEndCallback = useCallback(
    (event: DragEvent, initial: Position, data: PortData) => {
      if (!isDisabled && linkable) {
        // @ts-ignore
        event.dragType = getDragType(true);
        setDragCursor(null);

        canvas.onDragEnd(event, initial, properties, data);
        onDragEnd?.(event, initial, properties, data);
        setDragging(false);
      }
    },
    [
      canvas,
      getDragType,
      isDisabled,
      linkable,
      onDragEnd,
      properties,
      setDragCursor
    ]
  );

  return (
    <motion.g
      id={id}
      initial={{
        cursor: 'initial',
        opacity: 0,
        translateX: x,
        translateY: y
      }}
      animate={controls}
    >
      <motion.rect
        {...bind()}
        ref={nodeRef}
        tabIndex={-1}
        onKeyDown={onKeyDownCallback}
        onClick={onClickCallback}
        onTouchStart={onTouchStartCallback}
        onMouseEnter={onMouseEnterCallback}
        onMouseLeave={onMouseLeaveCallback}
        className={classNames(css.rect, className, properties?.className, {
          [css.active]: isActive,
          [css.disabled]: isDisabled,
          [css.unlinkable]: isLinkable === false && !isNodeDrag,
          [css.dragging]: dragging,
          [css.children]: nodes?.length > 0,
          [css.deleteHovered]: deleteHovered,
          [css.selectionDisabled]: !canSelect
        })}
        style={style}
        height={height}
        width={width}
        rx={rx}
        ry={ry}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: !animated ? { type: false, duration: 0 } : {}
        }}
      />
      {children && (
        <Fragment>
          {typeof children === 'function'
            ? (children as NodeChildrenAsFunction)(nodeChildProps)
            : children}
        </Fragment>
      )}
      {icon && properties.icon && (
        <CloneElement<IconProps> element={icon} {...properties.icon} />
      )}
      {label &&
        labels?.length > 0 &&
        labels.map((l, index) => (
          <CloneElement<LabelProps>
            element={label}
            key={index}
            {...(l as LabelProps)}
          />
        ))}
      {port &&
        ports?.length > 0 &&
        ports.map((p) => (
          <CloneElement<PortProps>
            element={port}
            key={p.id}
            active={!isMultiPort && dragging}
            disabled={isDisabled || !linkable}
            offsetX={newX}
            offsetY={newY}
            onDragStart={onDragStartCallback}
            onDrag={onDragCallback}
            onDragEnd={onDragEndCallback}
            {...(p as PortProps)}
            id={`${id}-port-${p.id}`}
          />
        ))}
      {!isDisabled && isActive && !readonly && remove && removable && (
        <CloneElement<RemoveProps>
          element={remove}
          y={height / 2}
          x={width}
          onClick={(event: React.MouseEvent<SVGGElement, MouseEvent>) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove?.(event, properties);
            setDeleteHovered(false);
          }}
          onEnter={() => setDeleteHovered(true)}
          onLeave={() => setDeleteHovered(false)}
        />
      )}
      <g>
        {edges?.length > 0 &&
          edges.map((e: any) => {
            const element =
              typeof childEdge === 'function' ? childEdge(e) : childEdge;
            return (
              <CloneElement<EdgeProps>
                key={e.id}
                element={element}
                id={`${id}-edge-${e.id}`}
                disabled={isDisabled}
                {...e}
                properties={{
                  ...e.properties,
                  ...(e.data ? { data: e.data } : {})
                }}
              />
            );
          })}
        {nodes?.length > 0 &&
          nodes.map(({ children, ...n }: any) => {
            const element =
              typeof childNode === 'function' ? childNode(n) : childNode;
            const elementDisabled =
              element.props?.disabled != null
                ? element.props.disabled
                : disabled;
            const elementAnimated =
              element.props?.animated != null
                ? element.props.animated
                : animated;
            const elementDraggable =
              element.props?.draggable != null
                ? element.props.draggable
                : draggable;
            const elementLinkable =
              element.props?.linkable != null
                ? element.props.linkable
                : linkable;
            const elementSelectable =
              element.props?.selectable != null
                ? element.props.selectable
                : selectable;
            const elementRemovable =
              element.props?.removable != null
                ? element.props.removable
                : removable;
            return (
              <CloneElement<NodeProps>
                key={n.id}
                element={element}
                id={`${id}-node-${n.id}`}
                disabled={elementDisabled}
                nodes={children}
                offsetX={newX}
                offsetY={newY}
                animated={elementAnimated}
                children={element.props.children}
                childNode={childNode}
                dragCursor={dragCursor}
                dragType={dragType}
                childEdge={childEdge}
                draggable={elementDraggable}
                linkable={elementLinkable}
                selectable={elementSelectable}
                removable={elementRemovable}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onClick={onClick}
                onEnter={onEnter}
                onLeave={onLeave}
                onKeyDown={onKeyDown}
                onRemove={onRemove}
                {...n}
              />
            );
          })}
      </g>
    </motion.g>
  );
};
