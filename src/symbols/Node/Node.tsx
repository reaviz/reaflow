import React, { FC, ReactElement, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { NodeData } from '../../types';
import { CloneElement } from 'rdk';
import { Icon, IconProps } from '../Icon';
import classNames from 'classnames';
import { useDrag } from 'react-use-gesture';
import css from './Node.module.scss';
import { State } from 'react-use-gesture/dist/types';

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
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>, data: NodeData) => void;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => void;

  onDrag?: (
    event: State['drag'],
    initial: [number, number],
    node: NodeData
  ) => void;
  onDragEnd?: (
    event: State['drag'],
    initial: [number, number],
    node: NodeData
  ) => void;
  onDragStart?: (
    event: State['drag'],
    initial: [number, number],
    node: NodeData
  ) => void;

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
  onLeave = () => undefined
}) => {
  const controls = useAnimation();
  const initial: [number, number] = [width / 2 + x, height + y];

  const bind = useDrag(
    (state) => {
      if (state.first) {
        // @ts-ignore
        const { x, bottom } = state.event.currentTarget.getBoundingClientRect();
        // memo will hold the difference between the first point of impact and the origin
        const memo = [state.xy[0] - x - width / 2, state.xy[1] - bottom];
        onDragStart({ ...state, memo }, initial, properties);
        document.body.classList.add('dragging');
        return memo;
      }
      onDrag(state, initial, properties);
      if (state.last) {
        onDragEnd(state, initial, properties);
        document.body.classList.remove('dragging');
      }
    },
    { enabled: !disabled }
  );

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
            {...(p as PortProps)}
          />
        ))}
    </motion.g>
  );
};
