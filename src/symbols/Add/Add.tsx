import React, { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import css from './Add.module.css';

export interface AddProps {
  x: number;
  y: number;
  size?: number;
  className?: string;
  hidden?: boolean;
  onEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}

export const Add: FC<Partial<AddProps>> = ({
  x,
  y,
  className,
  size = 15,
  hidden = true,
  onEnter = () => undefined,
  onLeave = () => undefined,
  onClick = () => undefined
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
        height={size * 2}
        width={size * 2}
        className={css.drop}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick(event);
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
      <rect height={size} width={size} className={css.rect} />
      <line
        x1="2"
        x2={size - 2}
        y1={half}
        y2={half}
        className={css.plus}
        strokeWidth="1"
      />
      <line
        x1={half}
        x2={half}
        y1="2"
        y2={size - 2}
        className={css.plus}
        strokeWidth="1"
      />
    </motion.g>
  );
};
