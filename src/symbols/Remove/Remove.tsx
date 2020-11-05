import React, { FC, useState } from 'react';
import classNames from 'classnames';
import css from './Remove.module.scss';
import { motion } from 'framer-motion';

export interface RemoveProps {
  x: number;
  y: number;
  size?: number;
  className?: any;
  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}

export const Remove: FC<Partial<RemoveProps>> = ({
  size = 15,
  className,
  x,
  y,
  onClick = () => undefined
}) => {
  const half = size / 2;
  const translateX = x - half;
  const translateY = y - half;

  return (
    <motion.g
      className={classNames(className, css.container)}
      initial={{ scale: 0, opacity: 0, translateX, translateY }}
      animate={{ scale: 1, opacity: 1, translateX, translateY }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <rect
        height={size * 1.5}
        width={size * 1.5}
        className={css.drop}
        onClick={onClick}
      />
      <rect height={size} width={size} className={css.rect} />
      <line
        x1="2"
        y1={size - 2}
        x2={size - 2}
        y2="2"
        className={css.deleteX}
        strokeWidth="1"
      />
      <line
        x1="2"
        y1="2"
        x2={size - 2}
        y2={size - 2}
        className={css.deleteX}
        strokeWidth="1"
      />
    </motion.g>
  );
};
