import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from '../types';
import Undoo from 'undoo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from 'react-use-gesture';

export interface UndoRedoEvent {
  nodes: NodeData[];
  edges: EdgeData[];
  type: 'undo' | 'redo';
}

export interface UndoProps {
  nodes: NodeData[];
  edges: EdgeData[];
  maxHistory?: number;
  onUndoRedo: (state: UndoRedoEvent) => void;
}

export interface UndoResult {
  canUndo: boolean;
  canRedo: boolean;
  count: () => number;
  history: () => { nodes: NodeData[]; edges: EdgeData[]; }[];
  redo: () => void;
  undo: () => void;
}

export const useUndo = ({
  nodes,
  edges,
  maxHistory = 20,
  onUndoRedo
}: UndoProps): UndoResult => {
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const manager = useRef<Undoo>(new Undoo({
    maxLength: maxHistory
  }));

  useEffect(() => {
    manager.current.save({
      nodes,
      edges
    });

    setCanUndo(manager.current.canUndo());
    setCanRedo(manager.current.canRedo());
  }, [nodes, edges]);

  const undo = useCallback(() => {
    manager.current.undo(state => {
      setCanUndo(manager.current.canUndo());
      onUndoRedo({ ...state, type: 'undo' });
    });
  }, [onUndoRedo]);

  const redo = useCallback(() => {
    manager.current.redo(state => {
      setCanRedo(manager.current.canRedo());
      onUndoRedo({ ...state, type: 'redo' });
    });
  }, [onUndoRedo]);

  useHotkeys([
    {
      name: 'Undo',
      keys: 'mod+z',
      category: 'Canvas',
      description: 'Undo changes',
      callback: (event) => {
        event.preventDefault();
        undo();
      }
    },
    {
      name: 'Redo',
      keys: 'mod+shift+z',
      category: 'Canvas',
      description: 'Redo changes',
      callback: (event) => {
        event.preventDefault();
        redo();
      }
    }
  ]);

  return {
    canUndo,
    canRedo,
    count: manager.current.count,
    history: manager.current.history,
    redo,
    undo
  };
};
