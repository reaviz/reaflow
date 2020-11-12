import { useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import { State } from 'react-use-gesture/dist/types';
import { NodeData } from '../types';

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

  const bind = useDrag(
    (state) => {
      if (state.event.type === 'pointerdown') {
        targetRef.current = state.event.currentTarget;
      }

      if (!state.intentional || !targetRef.current) {
        return;
      }

      if (state.first) {
        // @ts-ignore
        const { x, bottom } = targetRef.current.getBoundingClientRect();

        // memo will hold the difference between the first point of impact and the origin
        const memo = [state.xy[0] - x - width / 2, state.xy[1] - bottom];

        memo[0] = memo[0] / -0.7;
        memo[1] = memo[1] / -0.7;

        /*
        // TODO: Figure out canvas zoom
        // @ts-ignore
        const svgElm = targetRef.current.ownerSVGElement;
        let point = svgElm.createSVGPoint();
        point.x = state.xy[0]; // 869
        point.y = state.xy[1]; // 181
        point = point.matrixTransform(svgElm.getScreenCTM().inverse());
        memo[0] = point.x;
        memo[1] = point.y;
        */

        onDragStart({ ...state, memo }, initial, node);
        document.body.classList.add('dragging');

        return memo;
      }

      onDrag(state, initial, node);

      if (state.last) {
        targetRef.current = null;
        onDragEnd(state, initial, node);
        document.body.classList.remove('dragging');
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
