import React, { forwardRef, Fragment, ReactNode, Ref, useState } from 'react';
import { motion } from 'framer-motion';
import { PortData } from '../../types';
import {
  NodeDragEvents,
  DragEvent,
  useNodeDrag,
  Position
} from '../../utils/useNodeDrag';
import classNames from 'classnames';
import { useCanvas } from '../../utils/CanvasProvider';
import css from './Port.module.css';

export interface ElkPortProperties {
  index: number;
  width: number;
  height: number;
  'port.side': string;
  'port.alignment': string;
}

export interface PortChildProps {
  port: PortData;
  isDisabled: boolean;
  isDragging: boolean;
  isHovered: boolean;
  x: number;
  y: number;
  rx: number;
  ry: number;
  offsetX: number;
  offsetY: number;
}

export type PortChildrenAsFunction = (
  portChildProps: PortChildProps
) => ReactNode;

export interface PortProps extends NodeDragEvents<PortData> {
  id: string;
  x: number;
  y: number;
  rx: number;
  ry: number;
  offsetX: number;
  offsetY: number;
  disabled?: boolean;
  className?: string;
  properties: ElkPortProperties & PortData;
  style?: any;
  children?: ReactNode | PortChildrenAsFunction;
  active?: boolean;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
}

export const Port = forwardRef(
  (
    {
      x,
      y,
      rx,
      ry,
      disabled,
      style,
      children,
      properties,
      offsetX,
      offsetY,
      className,
      active,
      onDrag = () => undefined,
      onDragStart = () => undefined,
      onDragEnd = () => undefined,
      onEnter = () => undefined,
      onLeave = () => undefined,
      onClick = () => undefined
    }: Partial<PortProps>,
    ref: Ref<SVGRectElement>
  ) => {
    const { readonly } = useCanvas();
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const newX = x - properties.width / 2;
    const newY = y - properties.height / 2;

    const onDragStartInternal = (event: DragEvent, initial: Position) => {
      onDragStart(event, initial, properties);
      setIsDragging(true);
    };

    const onDragEndInternal = (event: DragEvent, initial: Position) => {
      onDragEnd(event, initial, properties);
      setIsDragging(false);
    };

    const bind = useNodeDrag({
      x: newX + offsetX,
      y: newY + offsetY,
      height: properties.height,
      width: properties.width,
      disabled: disabled || readonly || properties?.disabled,
      node: properties,
      onDrag,
      onDragStart: onDragStartInternal,
      onDragEnd: onDragEndInternal
    });

    if (properties.hidden) {
      return null;
    }

    const isDisabled = properties.disabled || disabled;

    const portChildProps: PortChildProps = {
      port: properties,
      isDragging,
      isHovered,
      isDisabled,
      x,
      y,
      rx,
      ry,
      offsetX,
      offsetY
    };

    return (
      <g>
        <rect
          {...bind()}
          ref={ref}
          height={properties.height + 14}
          width={properties.width + 14}
          x={newX - 7}
          y={newY - 7}
          className={classNames(css.clicker, { [css.disabled]: isDisabled })}
          onMouseEnter={(event) => {
            event.stopPropagation();
            setIsHovered(true);
            onEnter(event, properties);
          }}
          onMouseLeave={(event) => {
            event.stopPropagation();
            setIsHovered(false);
            onLeave(event, properties);
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClick(event, properties);
          }}
        />
        <motion.rect
          key={`${x}-${y}`}
          style={style}
          className={classNames(css.port, className, properties?.className)}
          height={properties.height}
          width={properties.width}
          rx={rx}
          ry={ry}
          initial={{
            scale: 0,
            opacity: 0,
            x: newX,
            y: newY
          }}
          animate={{
            x: newX,
            y: newY,
            scale: (isDragging || active || isHovered) && !isDisabled ? 1.5 : 1,
            opacity: 1
          }}
        />
        {children && (
          <Fragment>
            {typeof children === 'function'
              ? (children as PortChildrenAsFunction)(portChildProps)
              : children}
          </Fragment>
        )}
      </g>
    );
  }
);
