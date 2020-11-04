import React, { forwardRef, Ref } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PortData } from '../../Canvas';
import css from './Port.module.scss';

export interface ElkPortProperties {
  index: number;
  width: number;
  height: number;
  'port.side': string;
  'port.alignment': string;
}

export interface PortProps {
  id: string;
  x: number;
  y: number;
  disabled?: boolean;
  properties: ElkPortProperties & PortData;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    port: PortData
  ) => void;
}

export const Port = forwardRef(
  ({
    x,
    y,
    disabled,
    properties,
    onEnter = () => undefined,
    onLeave = () => undefined
  }: Partial<PortProps>, ref: Ref<SVGRectElement>) => {
    const isNorth = properties['port.side'] === 'NORTH';
    // const isEast = properties['port.side'] === 'WEST';
    const isSouth = properties['port.side'] === 'SOUTH';

    // Dont render north points
    // if (isNorth || isEast) {
    //  return null;
    // }

    const newX = x - (properties.width / 2);
    const newY = y - (properties.height / 2);

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
          initial={{
            scale: 0,
            opacity: 0,
            x: newX,
            y: newY
          }}
          animate={{
            x: newX,
            y: newY,
            scale: 1,
            opacity: 1
          }}
          whileHover={{ scale: disabled ? 1 : 1.5 }}
          onMouseEnter={event => {
            event.stopPropagation();
            onEnter(event, properties);
          }}
          onMouseLeave={event => {
            event.stopPropagation();
            onLeave(event, properties);
          }}
        />
      </g>
    );
  }
);
