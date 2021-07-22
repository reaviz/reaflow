import { useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import { State } from 'react-use-gesture/dist/types';
import { NodeData } from '../types';
import { useCanvas } from './CanvasProvider';
import { getCoords } from './helpers';

export type DragEvent = State['drag'];
export type Position = [number, number];

export interface NodeDragEvents<T = any, TT = any | undefined> {
  onDrag?: (event: DragEvent, initial: Position, data: T, extra?: TT) => void;
  onDragEnd?: (
    event: DragEvent,
    initial: Position,
    data: T,
    extra?: TT
  ) => void;
  onDragStart?: (
    event: DragEvent,
    initial: Position,
    data: T,
    extra?: TT
  ) => void;
}

export interface NodeDragProps extends NodeDragEvents {
  node: NodeData;
  height: number;
  width: number;
  x: number;
  y: number;
  disabled: boolean;
}

export const useNodeDrag = ({
  x,
  y,
  height,
  width,
  onDrag,
  onDragEnd,
  onDragStart,
  node,
  disabled
}: NodeDragProps) => {
  const initial: Position = [width / 2 + x, height + y];
  const targetRef = useRef<EventTarget | null>(null);
  const {
    zoom,
    scrollXY,
    layout,
    containerWidth,
    containerRef,
    containerHeight
  } = useCanvas();

  const bind = useDrag(
    (state) => {
      if (state.event.type === 'pointerdown') {
        targetRef.current = state.event.currentTarget;
      }

      if (!state.intentional || !targetRef.current) {
        return;
      }

      if (state.first) {
        const matrix = getCoords({
          containerRef,
          zoom,
          layout,
          scrollXY,
          containerHeight,
          containerWidth
        });

        // memo will hold the difference between the
        // first point of impact and the origin
        const memo = [matrix];

        onDragStart({ ...state, memo }, initial, node);

        return memo;
      }

      onDrag(state, initial, node);

      if (state.last) {
        targetRef.current = null;
        onDragEnd(state, initial, node);
      }
    },
    {
      enabled: !disabled,
      triggerAllEvents: true,
      threshold: 5
    }
  );

  return bind;
};
