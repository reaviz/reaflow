import React, { FC } from 'react';
import css from './Icon.module.scss';

export interface IconProps {
  x: number;
  y: number;
  url: string;
  height: number;
  width: number;
}

export const Icon: FC<Partial<IconProps>> = ({ x, y, url, height = 40, width = 40 }) => (
  <g
    className={css.icon}
    transform={`translate(${x + width / 2}, ${y - height / 2})`}
  >
    <image
      xlinkHref={url}
      width={width}
      height={height}
    />
  </g>
);
