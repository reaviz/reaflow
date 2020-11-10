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

  // Fixes internal reference issue
  const ref = useRef<string[]>(internalSelections);
  ref.current = internalSelections;

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
    selections: internalSelections,
    setSelections: setInternalSelections
  };
};
