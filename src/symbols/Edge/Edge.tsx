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
  properties?: any;
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
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: EdgeData
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<SVGGElement>,
    data: EdgeData
  ) => void;
  onEnter?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: EdgeData
  ) => void;
  onLeave?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: EdgeData
  ) => void;
  onRemove?: (edge: EdgeData) => void;
}

export const Edge: FC<Partial<EdgeProps>> = ({
  sections,
  properties,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined
}) => {
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
    <g
      className={css.edge}
      tabIndex={-1}
      onClick={event => {
        event.stopPropagation();
        onClick(event, properties);
      }}
      onKeyDown={event => {
        event.stopPropagation();
        onKeyDown(event, properties);
      }}
      onMouseEnter={event => {
        event.stopPropagation();
        onEnter(event, properties);
      }}
      onMouseLeave={event => {
        event.stopPropagation();
        onLeave(event, properties);
      }}
    >
      <path
        className={css.path}
        d={d}
        markerEnd="url(#end-arrow)"
      />
    </g>
  );
};
