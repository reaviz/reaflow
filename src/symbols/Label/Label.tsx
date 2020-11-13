import React, { FC } from 'react';
import classNames from 'classnames';
import css from './Label.module.scss';

export interface LabelProps {
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
  style?: any;
  className?: string;
}

export const Label: FC<Partial<LabelProps>> = ({
  text,
  x,
  y,
  style,
  className
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text className={classNames(css.text, className)} style={style}>
        {text}
      </text>
    </g>
  );
};
