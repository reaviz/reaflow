import React, { forwardRef, Ref, useState } from 'react';
import { motion } from 'framer-motion';
import { PortData } from '../../types';
import {
  NodeDragEvents,
  DragEvent,
  useNodeDrag,
  Position
} from '../../utils/useNodeDrag';
import css from './Port.module.scss';
import classNames from 'classnames';
import { useCanvas } from '../../utils/CanvasProvider';

export interface ElkPortProperties {
  index: number;
  width: number;
  height: number;
  'port.side': string;
  'port.alignment': string;
}

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
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
  onLeave?: (
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
      properties,
      offsetX,
      offsetY,
      className,
      onDrag = () => undefined,
      onDragStart = () => undefined,
      onDragEnd = () => undefined,
      onEnter = () => undefined,
      onLeave = () => undefined
    }: Partial<PortProps>,
    ref: Ref<SVGRectElement>
  ) => {
    const { readonly } = useCanvas();
    const [dragging, setDragging] = useState<boolean>(false);
    const newX = x - properties.width / 2;
    const newY = y - properties.height / 2;

    const onDragStartInternal = (event: DragEvent, initial: Position) => {
      onDragStart(event, initial, properties);
      setDragging(true);
    };

    const onDragEndInternal = (event: DragEvent, initial: Position) => {
      onDragEnd(event, initial, properties);
      setDragging(false);
    };

    const bind = useNodeDrag({
      x: newX + offsetX,
      y: newY + offsetY,
      height: properties.height,
      width: properties.width,
      disabled: disabled || readonly,
      node: properties,
      onDrag,
      onDragStart: onDragStartInternal,
      onDragEnd: onDragEndInternal
    });

    if (properties.hidden) {
      return null;
    }

    return (
      <g>
        <motion.rect
          {...bind()}
          ref={ref}
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
            scale: dragging ? 1.5 : 1,
            opacity: 1
          }}
          whileHover={{ scale: disabled ? 1 : 1.5 }}
          onMouseEnter={(event) => {
            event.stopPropagation();
            onEnter(event, properties);
          }}
          onMouseLeave={(event) => {
            event.stopPropagation();
            onLeave(event, properties);
          }}
        />
      </g>
    );
  }
);
