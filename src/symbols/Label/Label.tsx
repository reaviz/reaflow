import React, { FC } from 'react';
import css from './Label.module.scss';

export interface LabelProps {
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
  style?: any;
}

export const Label: FC<Partial<LabelProps>> = ({ text, x, y, style }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text className={css.text} style={style}>{text}</text>
    </g>
  );
};
