import React, { FC, useMemo } from 'react';
import { line, curveCardinal } from 'd3-shape';
import css from './Edge.module.scss';
import { NodeData } from 'Canvas';

export interface EdgeProps {
  id: string;
  disabled?: boolean;
  from: NodeData;
  to: NodeData;
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
}

export const Edge: FC<EdgeProps> = ({ from, to }) => {
  const d = useMemo(() => {
    const lineGenerator = line().curve(curveCardinal);

    const points = [
      [from.x, from.y],
      [to.x, to.y],
    ];

    return lineGenerator(points as any);
  }, [from, to]);

  return (
    <g>
      <path
        className={css.path}
        d={d}
      />
    </g>
  );
};
