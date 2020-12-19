import React, {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
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
}

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
  children?: ReactNode | ((node: NodeChildProps) => ReactNode);
  parent?: string;

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
  const newX = x + offsetX;
  const newY = y + offsetY;
  const isLinkable = checkNodeLinkable(properties, enteredNode, canLinkNode);
  const isMultiPort = ports?.filter((p) => !p.properties?.hidden).length > 1;

  const bind = useNodeDrag({
    x: newX,
    y: newY,
    height,
    width,
    disabled: disabled || isMultiPort || readonly,
    node: properties,
    onDrag: (...props) => {
      canvas.onDrag(...props);
      onDrag(...props);
    },
    onDragStart: (...props) => {
      canvas.onDragStart(...props);
      onDragStart(...props);
      setDragging(true);
    },
    onDragEnd: (...props) => {
      canvas.onDragEnd(...props);
      onDragEnd(...props);
      setDragging(false);
    }
  });

  useEffect(() => {
    controls.set({
      opacity: 1,
      translateX: x,
      translateY: y
    });
  }, [controls, x, y]);

  const renderNode = useCallback(
    ({ children, ...n }) => {
      const element =
        typeof childNode === 'function' ? childNode(n) : childNode;
      return (
        <CloneElement<NodeProps>
          key={n.id}
          element={element}
          id={`${id}-node-${n.id}`}
          disabled={disabled}
          nodes={children}
          offsetX={newX}
          offsetY={newY}
          children={element.props.children}
          childNode={childNode}
          childEdge={childEdge}
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
    },
    [
      childNode,
      id,
      disabled,
      newX,
      newY,
      childEdge,
      onDragStart,
      onDrag,
      onDragEnd,
      onClick,
      onEnter,
      onLeave,
      onKeyDown,
      onRemove
    ]
  );

  const renderEdge = useCallback(
    (e) => {
      const element =
        typeof childEdge === 'function' ? childEdge(e) : childEdge;
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
    [childEdge, disabled, id]
  );

  return (
    <motion.g
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
        onKeyDown={(event) => {
          event.preventDefault();
          onKeyDown(event, properties);
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick(event, properties);
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onMouseEnter={(event) => {
          event.stopPropagation();
          canvas.onEnter(event, properties);
          onEnter(event, properties);
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          canvas.onLeave(event, properties);
          onLeave(event, properties);
        }}
        className={classNames(css.rect, className, properties?.className, {
          [css.active]: isActive,
          [css.disabled]: disabled,
          [css.unlinkable]: isLinkable === false,
          [css.dragging]: dragging,
          [css.children]: nodes?.length > 0,
          [css.deleteHovered]: deleteHovered
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
          opacity: 1
        }}
      />
      {children && (
        <foreignObject height={height} width={width} x={0} y={0}>
          {typeof children === 'function'
            ? (children as any)({ height, width, x, y, node: properties })
            : children}
        </foreignObject>
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
            disabled={disabled}
            offsetX={newX}
            offsetY={newY}
            onDragStart={(
              event: DragEvent,
              initial: Position,
              data: PortData
            ) => {
              canvas.onDragStart(event, initial, properties, data);
              onDragStart(event, initial, properties, data);
              setDragging(true);
            }}
            onDrag={(event: DragEvent, initial: Position, data: PortData) => {
              canvas.onDrag(event, initial, properties, data);
              onDrag(event, initial, properties, data);
            }}
            onDragEnd={(
              event: DragEvent,
              initial: Position,
              data: PortData
            ) => {
              canvas.onDragEnd(event, initial, properties, data);
              onDragEnd(event, initial, properties, data);
              setDragging(false);
            }}
            {...(p as PortProps)}
          />
        ))}
      {!disabled && isActive && !readonly && remove && (
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
        {edges?.length > 0 && edges.map(renderEdge)}
        {nodes?.length > 0 && nodes.map(renderNode)}
      </g>
    </motion.g>
  );
};
