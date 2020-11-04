import React, { FC, useMemo } from 'react';
import { line, curveBundle } from 'd3-shape';
import { EdgeData } from '../../Canvas';
import css from './Edge.module.scss';

export interface EdgeProps {
  id: string;
  disabled?: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  sections: {
    id: string;
    endPoint: {
      x: number;
      y: number;
    };
    startPoint: {
      x: number;
      y: number;
    };
    bendPoints?: {
      x: number;
      y: number;
    }[];
  }[];
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
  onRemove?: (edge: EdgeData) => void;
}

export const Edge: FC<Partial<EdgeProps>> = ({ sections }) => {
  const d = useMemo(() => {
    const points: any[] = sections
      ? [
        sections[0].startPoint,
        ...(sections[0].bendPoints || []),
        sections[0].endPoint
      ]
      : [];

    const pathFn = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(curveBundle.beta(1));

    return pathFn(points);
  }, [sections]);

  return (
    <g>
      <path className={css.path} d={d} markerEnd="url(#end-arrow)" />
    </g>
  );
};
