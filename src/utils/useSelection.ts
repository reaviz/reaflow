import { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from 'types';
import { removeNode } from './externalHelpers';

export interface SelectionProps {
  selections?: string[];
  nodes?: NodeData[];
  edges?: EdgeData[];
  onSelection?: (nodes: NodeData[], edges: EdgeData[], value: string[]) => void;
}

export const useSelection = ({
  selections = [],
  nodes = [],
  edges = [],
  onSelection = () => undefined
}: SelectionProps) => {
  const [internalSelections, setInternalSelections] = useState<string[]>(selections);
  const [metaKeyDown, setMetaKeyDown] = useState<boolean>(false);

  // Fixes internal reference issue
  const ref = useRef<string[]>(internalSelections);
  ref.current = internalSelections;

  const addSelection = (item: string) => {
    const has = internalSelections.includes(item);
    if (!has) {
      const next = [...internalSelections, item];

      onSelection(
        nodes,
        edges,
        next
      );

      setInternalSelections(next);
    }
  };

  const removeSelection = (item: string) => {
    const has = internalSelections.includes(item);
    if (has) {
      const next = internalSelections.filter(i => i !== item);

      onSelection(
        nodes,
        edges,
        next
      );

      setInternalSelections(next);
    }
  };

  const toggleSelection = (item: string) => {
    const has = internalSelections.includes(item);
    if (has) {
      removeSelection(item);
    } else {
      addSelection(item);
    }
  };

  const clearSelections = (next = []) => {
    setInternalSelections(next);
  };

  const onClick = (event, data) => {
    event.preventDefault();
    event.stopPropagation();

    if (!metaKeyDown) {
      clearSelections([data.id]);
    } else {
      toggleSelection(data.id);
    }

    setMetaKeyDown(false);
  };

  const onKeyDown = (event) => {
    event.preventDefault();
    setMetaKeyDown(event.metaKey || event.ctrlKey);
  };

  const onCanvasClick = () => {
    clearSelections();
    setMetaKeyDown(false);
  };

  useHotkeys([
    {
      name: 'Select All',
      keys: 'mod+a',
      callback: event => {
        event.preventDefault();
        const next = nodes.map(n => n.id);
        onSelection(nodes, edges, next);
        setInternalSelections(next);
      }
    },
    {
      name: 'Delete Selections',
      keys: 'backspace',
      callback: event => {
        event.preventDefault();
        const result = removeNode(nodes, edges, ref.current);

        onSelection(
          result.nodes,
          result.edges,
          []
        );

        setInternalSelections([]);
      }
    },
    {
      name: 'Deselect Selections',
      keys: 'escape',
      callback: event => {
        event.preventDefault();
        setInternalSelections([]);
      }
    }
  ]);

  return {
    onClick,
    onKeyDown,
    onCanvasClick,
    selections: internalSelections,
    clearSelections,
    addSelection,
    removeSelection,
    toggleSelection,
    setSelections: setInternalSelections
  };
};
