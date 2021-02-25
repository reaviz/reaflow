import { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from '../types';
import Undoo from 'undoo';

export type UndoRedoHistory = {
  nodes: NodeData[];
  edges: EdgeData[];
}[];

export interface UndoRedoEvent {
  /**
   * Updated node datas.
   */
  nodes?: NodeData[];

  /**
   * Updated edge datas.
   */
  edges?: EdgeData[];

  /**
   * Type of change.
   */
  type: 'undo' | 'redo' | 'clear';

  /**
   * Whether you can undo now.
   */
  canUndo: boolean;

  /**
   * Whether you can redo now.
   */
  canRedo: boolean;
}

export interface UndoProps {
  /**
   * Current node datas.
   */
  nodes: NodeData[];

  /**
   * Current edge datas.
   */
  edges: EdgeData[];

  /**
   * Initial history. Imported as initial history state if defined.
   *
   * @see https://github.com/fabioricali/undoo#Undoo+import
   */
  initialHistory?: UndoRedoHistory;

  /**
   * Max history count.
   */
  maxHistory?: number;

  /**
   * Disabled or not.
   */
  disabled?: boolean;

  /**
   * On undo/redo event handler.
   */
  onUndoRedo: (state: UndoRedoEvent) => void;
}

export interface UndoResult {
  /**
   * Can undo or not.
   */
  canUndo: boolean;

  /**
   * Can redo or not.
   */
  canRedo: boolean;

  /**
   * Count of existing changes.
   */
  count: () => number;

  /**
   * Clear state.
   */
  clear: () => void;

  /**
   * Get history of state.
   */
  history: () => UndoRedoHistory;

  /**
   * Perform an redo.
   */
  redo: () => void;

  /**
   * Perform a undo.
   */
  undo: () => void;
}

export const useUndo = ({
  nodes,
  edges,
  disabled,
  initialHistory,
  maxHistory = 20,
  onUndoRedo
}: UndoProps): UndoResult => {
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const undoo = new Undoo({
    maxLength: maxHistory
  });

  const manager = useRef<Undoo>(undoo);

  if (Array.isArray(initialHistory)) {
    undoo.import(initialHistory);
  }

  // Reference: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const callbackRef = useRef(onUndoRedo);
  useEffect(() => {
    callbackRef.current = onUndoRedo;
  }, [onUndoRedo]);

  useEffect(() => {
    manager.current.save({
      nodes,
      edges
    });

    setCanUndo(manager.current.canUndo());
    setCanRedo(manager.current.canRedo());
  }, [nodes, edges]);

  const undo = useCallback(() => {
    manager.current.undo((state) => {
      const nextUndo = manager.current.canUndo();
      const nextRedo = manager.current.canRedo();
      setCanUndo(nextUndo);
      setCanRedo(nextRedo);

      callbackRef.current({
        ...state,
        type: 'undo',
        canUndo: nextUndo,
        canRedo: nextRedo
      });
    });
  }, []);

  const redo = useCallback(() => {
    manager.current.redo((state) => {
      const nextUndo = manager.current.canUndo();
      const nextRedo = manager.current.canRedo();
      setCanUndo(nextUndo);
      setCanRedo(nextRedo);

      callbackRef.current({
        ...state,
        type: 'redo',
        canUndo: nextUndo,
        canRedo: nextRedo
      });
    });
  }, []);

  const clear = useCallback(() => {
    manager.current.clear();
    setCanUndo(false);
    setCanRedo(false);

    callbackRef.current({
      type: 'clear',
      canUndo: false,
      canRedo: false
    });
  }, []);

  useHotkeys([
    {
      name: 'Undo',
      keys: 'mod+z',
      category: 'Canvas',
      description: 'Undo changes',
      callback: (event) => {
        event.preventDefault();
        if (!disabled) {
          undo();
        }
      }
    },
    {
      name: 'Redo',
      keys: 'mod+shift+z',
      category: 'Canvas',
      description: 'Redo changes',
      callback: (event) => {
        event.preventDefault();
        if (!disabled) {
          redo();
        }
      }
    }
  ]);

  return {
    canUndo,
    canRedo,
    count: manager.current.count,
    history: manager.current.history,
    clear,
    redo,
    undo
  } as UndoResult;
};
