import React, { FC } from 'react';
import { Arrow } from './Arrow';

export interface MarkerArrowProps {
  size?: number;
  style?: any;
}

export const MarkerArrow: FC<Partial<MarkerArrowProps>> = ({ size = 8, style }) => (
  <marker
    id="end-arrow"
    key="end-arrow"
    viewBox={`0 -${size / 2} ${size} ${size}`}
    refX={`${size}`}
    markerWidth={`${size}`}
    markerHeight={`${size}`}
    orient="auto"
  >
    <Arrow size={size} style={style} />
  </marker>
);
