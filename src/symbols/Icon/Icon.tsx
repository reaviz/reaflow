import React, { FC } from 'react';
import css from './Icon.module.scss';

export interface IconProps {
  x: number;
  y: number;
  url: string;
  height: number;
  width: number;
  style?: any;
}

export const Icon: FC<Partial<IconProps>> = ({ x, y, url, style, height = 40, width = 40 }) => (
  <g
    className={css.icon}
    transform={`translate(${x + width / 2}, ${y - height / 2})`}
  >
    <image
      style={style}
      xlinkHref={url}
      width={width}
      height={height}
    />
  </g>
);
