import React, { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port, PortProps } from '../Port';
import { Label, LabelProps } from '../Label';
import { NodeData } from '../../Canvas';
import css from './Node.module.scss';

export interface NodeProps {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  draggable?: boolean;
  disabled?: boolean;
  ports?: PortProps[];
  labels?: LabelProps[];
  properties: any;
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
}

export const Node: FC<Partial<NodeProps>> = ({
  x,
  y,
  ports,
  labels,
  height,
  width,
  properties,
  draggable = false,
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
      drag={draggable}
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
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
        className={css.rect}
        height={height}
        width={width}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
      />
      {labels?.length > 0 &&
        labels.map((label, index) => <Label key={index} {...label} />)}
      {ports?.length > 0 &&
        ports.map((port) => <Port key={port.id} {...port} />)}
    </motion.g>
  );
};
