import React, { forwardRef, Ref } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import css from './Port.module.scss';

export type ElkPortProps = {
  index: number;
  width: number;
  height: number;
  'port.side': string;
  'port.alignment': string;
};

export type PortProps = {
  id: string;
  x: number;
  y: number;
  properties?: ElkPortProps;
};

export const Port = forwardRef(
  ({ x, y, properties }: PortProps, ref: Ref<SVGRectElement>) => {
    const isNorth = properties['port.side'] === 'NORTH';
    const isEast = properties['port.side'] === 'WEST';
    const isSouth = properties['port.side'] === 'SOUTH';

    // Dont render north points
    // if (isNorth || isEast) {
    //  return null;
    // }

    // x = x - 5;
    // y = y - 5;

    return (
      <g>
        <motion.rect
          ref={ref}
          key={`${x}-${y}`}
          className={classNames(css.port, {
            [css.nortPort]: isNorth,
            [css.southPort]: isSouth
          })}
          height={properties.height}
          width={properties.width}
          initial={{ scale: 0, opacity: 0, x, y }}
          animate={{
            x,
            y,
            scale: 1,
            opacity: 1
          }}
        />
      </g>
    );
  }
);
