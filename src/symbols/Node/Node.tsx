import React, {
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
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

export interface NodeProps extends NodeDragEvents<NodeData, PortData> {
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
  properties: any;
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
  onRemove = () => undefined,
  onDrag = () => undefined,
  onDragStart = () => undefined,
  onDragEnd = () => undefined,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined
}) => {
  const controls = useAnimation();
  const {
    canLinkNode,
    enteredNode,
    selections,
    readonly,
    ...canvas
  } = useCanvas();
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const isActive = selections?.length
    ? selections.includes(properties.id)
    : null;
  const isNodeDrag = id.includes('node-drag');
  const newX = x + offsetX;
  const newY = y + offsetY;
  const isLinkable = checkNodeLinkable(properties, enteredNode, canLinkNode);
  const isMultiPort =
    dragType === 'multiportOnly' &&
    ports?.filter(p => !p.properties?.hidden).length > 1;
  const isDisabled = disabled || properties?.disabled;
  const canDrag = ['port', 'multiportOnly'].includes(dragType)
    ? linkable
    : draggable;
  const canSelect = selectable && !properties?.selectionDisabled;

  const getDragType = (hasPort: boolean) => {
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
  };

  const setDragCursor = (dragType: NodeDragType | null) => {
    if (dragType) {
      document.body.classList.add('dragging');
      document.body.style.cursor = dragType === 'node' ? 'grab' : 'crosshair';
    } else {
      document.body.classList.remove('dragging');
      document.body.style.cursor = 'auto';
    }
  };

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
        onDrag(...props);
      }
    },
    onDragStart: (event, coords, node, port) => {
      if (!isDisabled && canDrag) {
        // @ts-ignore
        event.dragType = getDragType(false);
        // @ts-ignore
        setDragCursor(event.dragType);

        canvas.onDragStart(event, coords, node, port);
        onDragStart(event, coords, node, port);
        setDragging(true);
      }
    },
    onDragEnd: (event, coords, node, port) => {
      if (!isDisabled && canDrag) {
        // @ts-ignore
        event.dragType = getDragType(false);

        canvas.onDragEnd(event, coords, node, port);
        onDragEnd(event, coords, node, port);
        setDragging(false);
        setDragCursor(null);
      }
    }
  });

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
        tabIndex={-1}
        onKeyDown={event => {
          event.preventDefault();
          if (!isDisabled) {
            onKeyDown(event, properties);
          }
        }}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          if (!isDisabled && canSelect) {
            onClick(event, properties);
          }
        }}
        onTouchStart={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onMouseEnter={event => {
          event.stopPropagation();
          canvas.onEnter(event, properties);
          if (!isDisabled) {
            onEnter(event, properties);
          }
        }}
        onMouseLeave={event => {
          event.stopPropagation();
          canvas.onLeave(event, properties);
          if (!isDisabled) {
            onLeave(event, properties);
          }
        }}
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
        ports.map(p => (
          <CloneElement<PortProps>
            element={port}
            key={p.id}
            active={!isMultiPort && dragging}
            disabled={isDisabled || !linkable}
            offsetX={newX}
            offsetY={newY}
            onDragStart={(
              event: DragEvent,
              initial: Position,
              data: PortData
            ) => {
              if (!isDisabled && linkable) {
                // @ts-ignore
                event.dragType = getDragType(true);
                // @ts-ignore
                setDragCursor(event.dragType);

                canvas.onDragStart(event, initial, properties, data);
                onDragStart(event, initial, properties, data);
                setDragging(true);
              }
            }}
            onDrag={(event: DragEvent, initial: Position, data: PortData) => {
              if (!isDisabled && linkable) {
                canvas.onDrag(event, initial, properties, data);
                onDrag(event, initial, properties, data);
              }
            }}
            onDragEnd={(
              event: DragEvent,
              initial: Position,
              data: PortData
            ) => {
              if (!isDisabled && linkable) {
                // @ts-ignore
                event.dragType = getDragType(true);
                setDragCursor(null);

                canvas.onDragEnd(event, initial, properties, data);
                onDragEnd(event, initial, properties, data);
                setDragging(false);
              }
            }}
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
            onRemove(event, properties);
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
              />
            );
          })}
        {nodes?.length > 0 &&
          nodes.map(({ children, ...n }: any) => {
            const element =
              typeof childNode === 'function' ? childNode(n) : childNode;
            return (
              <CloneElement<NodeProps>
                key={n.id}
                element={element}
                id={`${id}-node-${n.id}`}
                disabled={isDisabled}
                nodes={children}
                offsetX={newX}
                offsetY={newY}
                animated={animated}
                children={element.props.children}
                childNode={childNode}
                dragCursor={dragCursor}
                dragType={dragType}
                childEdge={childEdge}
                draggable={draggable}
                linkable={linkable}
                selectable={selectable}
                removable={removable}
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
