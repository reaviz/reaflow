import React, { FC } from 'react';
import css from './Label.module.scss';

export interface LabelProps {
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
}

export const Label: FC<LabelProps> = ({
  text,
  x,
  y
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text className={css.text}>{text}</text>
    </g>
  );
};
