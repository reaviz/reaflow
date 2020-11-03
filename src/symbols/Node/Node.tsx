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
  disabled?: boolean;
  ports?: PortProps[];
  labels?: LabelProps[];
  properties: any;
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, data: NodeData) => void;
  onKeyDown?: () => void;
}

export const Node: FC<NodeProps> = ({
  x,
  y,
  ports,
  labels,
  height,
  width,
  properties,
  onClick = () => undefined
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
      drag={false}
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
