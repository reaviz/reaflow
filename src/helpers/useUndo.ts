import { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from '../types';
import Undoo from 'undoo';

export interface UndoRedoEvent {
  nodes?: NodeData[];
  edges?: EdgeData[];
  type: 'undo' | 'redo' | 'clear';
  canUndo: boolean;
  canRedo: boolean;
}

export interface UndoProps {
  nodes: NodeData[];
  edges: EdgeData[];
  maxHistory?: number;
  disabled?: boolean;
  onUndoRedo: (state: UndoRedoEvent) => void;
}

export interface UndoResult {
  canUndo: boolean;
  canRedo: boolean;
  count: () => number;
  clear: () => void;
  history: () => { nodes: NodeData[]; edges: EdgeData[] }[];
  redo: () => void;
  undo: () => void;
}

export const useUndo = ({
  nodes,
  edges,
  disabled,
  maxHistory = 20,
  onUndoRedo
}: UndoProps): UndoResult => {
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const manager = useRef<Undoo>(
    new Undoo({
      maxLength: maxHistory
    })
  );

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
