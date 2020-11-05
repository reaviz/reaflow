import React, { FC, ReactElement, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { NodeData } from '../../types';
import { CloneElement } from 'rdk';
import { Icon, IconProps } from '../Icon';
import classNames from 'classnames';
import { useGesture } from 'react-use-gesture';
import { toggleTextSelection } from '../../utils/textSelection';
import css from './Node.module.scss';

export interface NodeProps {
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
  isActive: boolean | null;
  className?: string;
  style?: any;

  onRemove?: (node: NodeData) => void;

  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: NodeData
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<SVGGElement>,
    data: NodeData
  ) => void;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;

  onDrag?: (event: any, node: NodeData) => void;
  onDragEnd?: (event: any, node: NodeData) => void;
  onDragStart?: (event: any, node: NodeData) => void;

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
  port = <Port />,
  label = <Label />,
  onDrag = () => undefined,
  onDragStart = () => undefined,
  onDragEnd = () => undefined,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined,
}) => {
  const controls = useAnimation();
  const offsetX = width / 2;
  const offsetY = height;

  const bind = useGesture({
    onDragStart: ({ movement, ...rest }) => {
      onDragStart({
        ...rest,
        movement,
        offset: [x + offsetX, y + offsetY]
      }, properties);
      document.body.style['cursor'] = 'crosshair';
      toggleTextSelection(false);
    },
    onDrag: ({ movement, ...rest }) => {
      onDrag({
        ...rest,
        movement,
        offset: [movement[0] + x + offsetX, movement[1] + y + offsetY]
      }, properties);
    },
    onDragEnd: (event) => {
      onDragEnd(event, properties);
      document.body.style['cursor'] = 'inherit';
      toggleTextSelection(true);
    },
    onMouseUp: (event) => {
      onDragEnd(event, properties);
      document.body.style['cursor'] = 'inherit';
      toggleTextSelection(true);
    }
  }, {
    drag: {
      enabled: !disabled,
      threshold: 10
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
      onClick={event => {
        event.stopPropagation();
        onClick(event, properties);
      }}
      onKeyDown={event => {
        event.stopPropagation();
        onKeyDown(event, properties);
      }}
    >
      <motion.rect
        {...bind()}
        onMouseEnter={event => {
          event.stopPropagation();
          onEnter(event, properties);
        }}
        onMouseLeave={event => {
          event.stopPropagation();
          onLeave(event, properties);
        }}
        className={classNames(css.rect, className, {
          [css.active]: isActive,
          [css.disabled]: disabled
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
      {icon && (
        <CloneElement<IconProps>
          element={icon}
          {...properties.icon}
          y={height / 2}
          x={0}
        />
      )}
      {labels?.length > 0 && labels.map((l, index) => (
        <CloneElement<LabelProps>
          element={label}
          key={index}
          {...(l as LabelProps)}
        />
      ))}
      {ports?.length > 0 && ports.map(p => (
        <CloneElement<PortProps>
          element={port}
          key={p.id}
          disabled={disabled}
          {...(p as PortProps)}
        />
      ))}
    </motion.g>
  );
};
