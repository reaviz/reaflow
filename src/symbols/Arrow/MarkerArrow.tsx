import React, { FC } from 'react';
import { Arrow } from './Arrow';

type MarkerArrowProps = {
  size?: number;
};

export const MarkerArrow: FC<MarkerArrowProps> = ({ size = 8 }) => (
  <marker
    id="end-arrow"
    key="end-arrow"
    viewBox={`0 -${size / 2} ${size} ${size}`}
    refX={`${size}`}
    markerWidth={`${size}`}
    markerHeight={`${size}`}
    orient="auto"
  >
    <Arrow size={size} />
  </marker>
);
