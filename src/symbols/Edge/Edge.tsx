import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { EdgeData } from '../../types';
import { Label, LabelProps } from '../Label';
import { CloneElement } from 'rdk';
import classNames from 'classnames';
import { CenterCoords, getBezierPath, getPathCenter } from './utils';
import { curveBundle, line } from 'd3-shape';
import { Remove, RemoveProps } from '../Remove';
import { Add, AddProps } from '../Add';
import { useCanvas } from '../../utils/CanvasProvider';
import css from './Edge.module.scss';

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

export interface EdgeProps {
  id: string;
  disabled?: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  properties?: EdgeData;
  style?: any;
  sections: EdgeSections[];
  labels?: LabelProps[];
  className?: string;

  add: ReactElement<AddProps, typeof Add>;
  label: ReactElement<LabelProps, typeof Label>;
  remove: ReactElement<RemoveProps, typeof Remove>;

  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: EdgeData
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>, data: EdgeData) => void;
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
  onAdd?: (
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
  style,
  add = <Add />,
  remove = <Remove />,
  label = <Label />,
  onClick = () => undefined,
  onKeyDown = () => undefined,
  onEnter = () => undefined,
  onLeave = () => undefined,
  onRemove = () => undefined,
  onAdd = () => undefined
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const [center, setCenter] = useState<CenterCoords | null>(null);
  const { selections, readonly } = useCanvas();
  const isActive = selections?.length
    ? selections.includes(properties?.id)
    : null;

  const d = useMemo(() => {
    if (sections?.length === 0) {
      return null;
    }

    // Handle bend points that elk gives
    // us seperately from drag points
    if (sections[0].bendPoints) {
      const points: any[] = sections
        ? [
          sections[0].startPoint,
          ...(sections[0].bendPoints || ([] as any)),
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
    setCenter(
      getPathCenter(
        pathRef.current,
        sections[0].startPoint,
        sections[0].endPoint
      )
    );
  }, [sections]);

  return (
    <g className={classNames(css.edge, { [css.disabled]: disabled })}>
      <path
        ref={pathRef}
        style={style}
        className={classNames(className, properties?.className, css.path, {
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
          onClick(event, properties);
        }}
        onKeyDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onKeyDown(event, properties);
        }}
        onMouseEnter={(event) => {
          event.stopPropagation();
          onEnter(event, properties);
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          onLeave(event, properties);
        }}
      />
      {labels?.length > 0 &&
        labels.map((l, index) => (
          <CloneElement<LabelProps>
            element={label}
            key={index}
            {...(l as LabelProps)}
          />
        ))}
      {!disabled && center && !readonly && remove && (
        <CloneElement<RemoveProps>
          element={remove}
          {...center}
          hidden={
            remove.props.hidden !== undefined ? remove.props.hidden : !isActive
          }
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
      {!disabled && center && !readonly && add && (
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
