import { useDrag } from 'react-use-gesture';
import { State } from 'react-use-gesture/dist/types';
import { NodeData } from '../types';

export type DragEvent = State['drag'];
export type Position = [number, number];

export interface NodeDragEvents<T = any, TT = any | undefined> {
  onDrag?: (
    event: DragEvent,
    initial: Position,
    data: T,
    extra: TT
  ) => void;
  onDragEnd?: (
    event: DragEvent,
    initial: Position,
    data: T,
    extra: TT
  ) => void;
  onDragStart?: (
    event: DragEvent,
    initial: Position,
    data: T,
    extra: TT
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

export const useNodeDrag = ({ x, y, height, width, onDrag, onDragEnd, onDragStart, node, disabled }: NodeDragProps) => {
  const initial: Position = [width / 2 + x, height + y];

  const bind = useDrag(
    (state) => {
      if (state.first) {
        // @ts-ignore
        const { x, bottom } = state.event.currentTarget.getBoundingClientRect();

        // memo will hold the difference between the first point of impact and the origin
        const memo = [state.xy[0] - x - width / 2, state.xy[1] - bottom];
        onDragStart({ ...state, memo }, initial, node);
        document.body.classList.add('dragging');

        return memo;
      }

      onDrag(state, initial, node);

      if (state.last) {
        onDragEnd(state, initial, node);
        document.body.classList.remove('dragging');
      }
    },
    { enabled: !disabled }
  );

  return bind;
};

