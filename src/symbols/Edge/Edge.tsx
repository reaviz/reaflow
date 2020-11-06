import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { EdgeData } from '../../types';
import { Label, LabelProps } from '../Label';
import { CloneElement } from 'rdk';
import classNames from 'classnames';
import { CenterCoords, getBezierPath, getPathCenter } from './utils';
import { curveBundle, line } from 'd3-shape';
import { Remove, RemoveProps } from '../Remove';
import { Add, AddProps } from '../Add';
import css from './Edge.module.scss';

export interface EdgeProps {
  id: string;
  disabled?: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  properties?: EdgeData;
  style?: any;
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
  isActive: boolean | null;
  labels?: LabelProps[];
  className?: string;

  add: ReactElement<AddProps, typeof Add>;
  label: ReactElement<LabelProps, typeof Label>;
  remove: ReactElement<RemoveProps, typeof Remove>;

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
  onRemove?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    edge: EdgeData
  ) => void;
}

export const Edge: FC<Partial<EdgeProps>> = ({
  sections,
  properties,
  labels,
  className,
  disabled,
  isActive,
  style,
  add = <Add />,
  remove = <Remove />,
  label = <Label />,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined,
  onRemove = () => undefined
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [center, setCenter] = useState<CenterCoords | null>(null);

  const d = useMemo(() => {
    // Handle bend points that elk gives
    // us seperately from drag points
    if (sections[0].bendPoints) {
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
    } else {
      return getBezierPath({
        sourceX: sections[0].startPoint.x,
        sourceY: sections[0].startPoint.y,
        targetX: sections[0].endPoint.x,
        targetY: sections[0].endPoint.y
      });
    }
  }, [sections]);

  useEffect(() => {
    setCenter(getPathCenter(
      pathRef.current,
      sections[0].startPoint,
      sections[0].endPoint
    ));
  }, [sections, pathRef.current]);

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
        ref={pathRef}
        style={style}
        className={classNames(className, css.path, { [css.active]: isActive })}
        d={d}
        markerEnd="url(#end-arrow)"
      />
      {labels?.length > 0 && labels.map((l, index) => (
        <CloneElement<LabelProps>
          element={label}
          key={index}
          {...(l as LabelProps)}
        />
      ))}
      {!disabled && isActive && center && remove && (
        <CloneElement<RemoveProps>
          element={remove}
          {...center}
          onClick={event => onRemove(event, properties)}
        />
      )}
      {!disabled && center && !isActive && add && (
        <CloneElement<AddProps>
          element={add}
          {...center}
        />
      )}
    </g>
  );
};
