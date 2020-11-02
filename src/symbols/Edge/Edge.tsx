import React, { FC, useMemo } from 'react';
import { line, curveCardinal } from 'd3-shape';
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
    }
  }[];
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
}

export const Edge: FC<EdgeProps> = ({ sections }) => {
  const d = useMemo(() => {
    const lineGenerator = line().curve(curveCardinal);

    const points = [
      [sections[0].startPoint.x, sections[0].startPoint.y],
      [sections[0].endPoint.x, sections[0].endPoint.y]
    ];

    return lineGenerator(points as any);
  }, [sections]);

  return (
    <g>
      <path
        className={css.path}
        d={d}
      />
    </g>
  );
};
