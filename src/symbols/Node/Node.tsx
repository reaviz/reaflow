import React, { FC, ReactElement, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { NodeData } from '../../Canvas';
import { CloneElement } from 'rdk';
import css from './Node.module.scss';
import classNames from 'classnames';

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

  dragStart?: (node: NodeData) => void;
  dragStop?: (node: NodeData) => void;
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
  port = <Port />,
  label = <Label />,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined
}) => {
  const controls = useAnimation();

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
      onMouseEnter={event => {
        event.stopPropagation();
        onEnter(event, properties);
      }}
      onMouseLeave={event => {
        event.stopPropagation();
        onLeave(event, properties);
      }}
    >
      <motion.rect
        className={classNames(css.rect, className, {
          [css.active]: isActive
        })}
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
          {...(p as PortProps)}
        />
      ))}
    </motion.g>
  );
};
