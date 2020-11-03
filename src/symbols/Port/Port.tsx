import React, { forwardRef, Ref } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import css from './Port.module.scss';

export interface ElkPortProperties {
  index: number;
  width: number;
  height: number;
  'port.side': string;
  'port.alignment': string;
};

export interface PortProps {
  id: string;
  x: number;
  y: number;
  properties: ElkPortProperties;
}

export const Port = forwardRef(
  ({ x, y, properties }: PortProps, ref: Ref<SVGRectElement>) => {
    const isNorth = properties['port.side'] === 'NORTH';
    const isEast = properties['port.side'] === 'WEST';
    const isSouth = properties['port.side'] === 'SOUTH';

    // Dont render north points
    if (isNorth || isEast) {
      return null;
    }

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
          whileHover={{ scale: 1.3 }}
        />
      </g>
    );
  }
);
