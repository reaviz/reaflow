import React, { FC, Fragment, MutableRefObject, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { EdgeData } from '../../types';
import { Label, LabelProps } from '../Label';
import { CloneElement } from 'rdk';
import classNames from 'classnames';
import { CenterCoords, getBezierPath, getPathCenter } from './utils';
import { curveBundle, line } from 'd3-shape';
import { Remove, RemoveProps } from '../Remove';
import { Add, AddProps } from '../Add';
import { useCanvas } from '../../utils';
import css from './Edge.module.css';

export interface EdgeSections {
  id?: string;
  startPoint?: {
    x: number;
    y: number;
  };
  endPoint?: {
    x: number;
    y: number;
  };
  bendPoints?: {
    x: number;
    y: number;
  };
}

export interface EdgeChildProps {
  edge: EdgeData;
  pathRef: MutableRefObject<SVGPathElement> | null;
  center: CenterCoords | null;
}

export type EdgeChildrenAsFunction = (edgeChildProps: EdgeChildProps) => ReactNode;

export interface EdgeProps {
  id: string;
  disabled?: boolean;
  removable?: boolean;
  selectable?: boolean;
  upsertable?: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  properties?: EdgeData;
  style?: any;
  children?: ReactNode | EdgeChildrenAsFunction;
  sections: EdgeSections[];
  interpolation: 'linear' | 'curved' | Function;
  labels?: LabelProps[];
  className?: string;
  containerClassName?: string;

  add: ReactElement<AddProps, typeof Add>;
  label: ReactElement<LabelProps, typeof Label>;
  remove: ReactElement<RemoveProps, typeof Remove>;

  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, data: EdgeData) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>, data: EdgeData) => void;
  onEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: EdgeData) => void;
  onLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: EdgeData) => void;
  onRemove?: (event: React.MouseEvent<SVGGElement, MouseEvent>, edge: EdgeData) => void;
  onAdd?: (event: React.MouseEvent<SVGGElement, MouseEvent>, edge: EdgeData) => void;
}

export const Edge: FC<Partial<EdgeProps>> = ({ sections, properties, labels, className, containerClassName, disabled, removable = true, selectable = true, upsertable = true, style, interpolation = 'curved', children, add = <Add />, remove = <Remove />, label = <Label />, onClick = () => undefined, onKeyDown = () => undefined, onEnter = () => undefined, onLeave = () => undefined, onRemove = () => undefined, onAdd = () => undefined }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const [center, setCenter] = useState<CenterCoords | null>(null);
  const { selections, readonly } = useCanvas();
  const isActive: boolean = selections?.length ? selections.includes(properties?.id) : false;
  const isDisabled = disabled || properties?.disabled;
  const canSelect = selectable && !properties?.selectionDisabled;

  // The "d" attribute defines a path to be drawn. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
  const d = useMemo(() => {
    if (!sections?.length) {
      return null;
    }

    // Handle bend points that elk gives
    // us separately from drag points
    if (sections[0].bendPoints) {
      const points: any[] = sections ? [sections[0].startPoint, ...(sections[0].bendPoints || ([] as any)), sections[0].endPoint] : [];

      let pathFn: any = line()
        .x((d: any) => d.x)
        .y((d: any) => d.y);
      if (interpolation !== 'linear') {
        pathFn = interpolation === 'curved' ? pathFn.curve(curveBundle.beta(1)) : interpolation;
      }
      return pathFn(points);
    } else {
      return getBezierPath({
        sourceX: sections[0].startPoint.x,
        sourceY: sections[0].startPoint.y,
        targetX: sections[0].endPoint.x,
        targetY: sections[0].endPoint.y
      });
    }
  }, [interpolation, sections]);

  useEffect(() => {
    if (sections?.length > 0) {
      setCenter(getPathCenter(pathRef.current, sections[0].startPoint, sections[0].endPoint));
    }
  }, [sections]);

  const edgeChildProps: EdgeChildProps = {
    edge: properties,
    center,
    pathRef
  };

  return (
    <g
      className={classNames(css.edge, containerClassName, {
        [css.disabled]: isDisabled,
        [css.selectionDisabled]: !canSelect
      })}
    >
      <path
        ref={pathRef}
        style={style}
        className={classNames(css.path, properties?.className, className, {
          [css.active]: isActive,
          [css.deleteHovered]: deleteHovered
        })}
        d={d}
        markerEnd="url(#end-arrow)"
      />
      <path
        className={css.clicker}
        d={d}
        tabIndex={-1}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!isDisabled && canSelect) {
            onClick(event, properties);
          }
        }}
        onKeyDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!isDisabled) {
            onKeyDown(event, properties);
          }
        }}
        onMouseEnter={(event) => {
          event.stopPropagation();
          if (!isDisabled) {
            onEnter(event, properties);
          }
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          if (!isDisabled) {
            onLeave(event, properties);
          }
        }}
      />
      {children && <Fragment>{typeof children === 'function' ? (children as EdgeChildrenAsFunction)(edgeChildProps) : children}</Fragment>}
      {labels?.length > 0 && labels.map((l, index) => <CloneElement<LabelProps> element={label} key={index} edgeChildProps={edgeChildProps} {...(l as LabelProps)} />)}
      {!isDisabled && center && !readonly && remove && removable && (
        <CloneElement<RemoveProps>
          element={remove}
          {...center}
          hidden={remove.props.hidden !== undefined ? remove.props.hidden : !isActive}
          onClick={(event: React.MouseEvent<SVGGElement, MouseEvent>) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove(event, properties);
            setDeleteHovered(false);
          }}
          onEnter={() => setDeleteHovered(true)}
          onLeave={() => setDeleteHovered(false)}
        />
      )}
      {!isDisabled && center && !readonly && add && upsertable && (
        <CloneElement<AddProps>
          element={add}
          {...center}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onAdd(event, properties);
          }}
        />
      )}
    </g>
  );
};
