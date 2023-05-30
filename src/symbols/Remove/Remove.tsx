import React, { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import css from './Remove.module.css';

export interface RemoveProps {
  x: number;
  y: number;
  hidden?: boolean;
  size?: number;
  className?: string;
  onEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}

export const Remove: FC<Partial<RemoveProps>> = ({
  size = 15,
  className,
  hidden,
  x,
  y,
  onClick = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined
}) => {
  if (hidden) {
    return null;
  }

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
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick(event);
        }}
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
