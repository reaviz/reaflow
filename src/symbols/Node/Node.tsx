import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { NodeData, PortData } from '../../types';
import { CloneElement } from 'rdk';
import { Icon, IconProps } from '../Icon';
import classNames from 'classnames';
import { Remove, RemoveProps } from '../Remove';
import { NodeDragEvents, DragEvent, useNodeDrag, Position } from '../../utils/useNodeDrag';
import css from './Node.module.scss';

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
  disabled?: boolean;
  ports?: PortProps[];
  labels?: LabelProps[];
  properties: any;
  className?: string;
  style?: any;
  isLinkable: boolean | null;
  isActive: boolean | null;
  children?: ReactNode | ((node: NodeChildProps) => ReactNode);
  nodes?: NodeData[];

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

  remove: ReactElement<RemoveProps, typeof Remove>;
  icon: ReactElement<IconProps, typeof Icon>;
  label: ReactElement<LabelProps, typeof Label>;
  port: ReactElement<PortProps, typeof Port>;
}

export const Node: FC<Partial<NodeProps>> = ({
  x,
  y,
  ports,
  labels,
  height,
  width,
  properties,
  className,
  isActive,
  rx = 2,
  ry = 2,
  icon,
  disabled,
  style,
  isLinkable,
  children,
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
  const [dragging, setDragging] = useState<boolean>(false);

  const bind = useNodeDrag({
    x,
    y,
    height,
    width,
    disabled: disabled || ports?.length > 2,
    node: properties,
    onDrag,
    onDragStart: (event: DragEvent, initial: Position, data: NodeData) => {
      onDragStart(event, initial, data);
      setDragging(true);
    },
    onDragEnd: (event: DragEvent, initial: Position, data: NodeData) => {
      onDragEnd(event, initial, data);
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

  return (
    <motion.g
      tabIndex={-1}
      className={css.container}
      initial={{
        cursor: 'initial',
        opacity: 0,
        translateX: x,
        translateY: y
      }}
      animate={controls}
      onClick={(event) => {
        event.stopPropagation();
        onClick(event, properties);
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        onKeyDown(event, properties);
      }}
    >
      <motion.rect
        {...bind()}
        onMouseEnter={(event) => {
          event.stopPropagation();
          onEnter(event, properties);
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          onLeave(event, properties);
        }}
        className={classNames(css.rect, className, {
          [css.active]: isActive,
          [css.disabled]: disabled,
          [css.unlinkable]: isLinkable === false,
          [css.dragging]: dragging
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
        <foreignObject
          height={height}
          width={width}
          x={0}
          y={0}
        >
          {typeof children === 'function'
            ? (children as any)({ height, width, x, y, node: properties })
            : children
          }
        </foreignObject>
      )}
      {icon && (
        <CloneElement<IconProps>
          element={icon}
          {...properties.icon}
          y={height / 2}
          x={0}
        />
      )}
      {labels?.length > 0 &&
        labels.map((l, index) => (
          <CloneElement<LabelProps>
            element={label}
            key={index}
            {...(l as LabelProps)}
          />
        ))}
      {ports?.length > 0 &&
        ports.map((p) => (
          <CloneElement<PortProps>
            element={port}
            key={p.id}
            disabled={disabled}
            offsetX={x}
            offsetY={y}
            onDrag={onDrag}
            onDragStart={(event: DragEvent, initial: Position, data: PortData) => {
              onDragStart(event, initial, properties, data);
              setDragging(true);
            }}
            onDragEnd={(event: DragEvent, initial: Position, data: PortData) => {
              onDragEnd(event, initial, properties, data);
              setDragging(false);
            }}
            {...(p as PortProps)}
          />
        ))}
      {!disabled && isActive && remove && (
        <CloneElement<RemoveProps>
          element={remove}
          y={height / 2}
          x={width}
          onClick={event => onRemove(event, properties)}
        />
      )}
    </motion.g>
  );
};
