import classNames from 'classnames';
import React, { FC } from 'react';
import { Arrow } from './Arrow';
import css from './Arrow.module.css';

export interface MarkerArrowProps {
  size?: number;
  style?: any;
  className?: string;
}

const MarkerArrowBase: FC<Partial<MarkerArrowProps>> = ({
  size = 8,
  className,
  style,
  id
}) => (
  <marker
    id={id}
    key={id}
    viewBox={`0 -${size / 2} ${size} ${size}`}
    refX={`${size}`}
    markerWidth={`${size}`}
    markerHeight={`${size}`}
    orient="auto"
  >
    <Arrow size={size} style={style} className={className} />
  </marker>
);

export const MarkerArrow: FC<Partial<MarkerArrowProps>> = ({
  size = 8,
  className,
  style
}) => (
  <MarkerArrowBase
    id="end-arrow"
    size={size}
    className={className}
    style={style}
  />
);

export const MarkerArrowHover: FC<Partial<MarkerArrowProps>> = ({
  size = 8,
  className,
  style
}) => (
  <MarkerArrowBase
    id="end-arrow-hover"
    size={size}
    className={classNames(css['arrow__hover'], className)}
    style={style}
  />
);

export const MarkerArrowActive: FC<Partial<MarkerArrowProps>> = ({
  size = 8
}) => (
  <MarkerArrowBase
    id="end-arrow-hover-active"
    size={size}
    className={classNames(css['arrow__hover--active'])}
  />
);

export const MarkerArrowDelete: FC<Partial<MarkerArrowProps>> = ({
  size = 8
}) => (
  <MarkerArrowBase
    id="end-arrow-hover-delete"
    size={size}
    className={classNames(css['arrow__hover--delete'])}
  />
);
