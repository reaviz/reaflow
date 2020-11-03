import React, { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Port } from '../Port';
import css from './Node.module.scss';

export interface NodeProps {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  disabled?: boolean;
  ports: any[];
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
}

export const Node: FC<NodeProps> = ({ x, y, ports, height, width }) => {
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
      drag
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      initial={{
        cursor: 'initial',
        opacity: 0,
        translateX: x,
        translateY: y
      }}
      animate={controls}
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
      {ports?.length > 0 &&
        ports.map((port) => <Port key={port.id} {...port} />)}
    </motion.g>
  );
};
