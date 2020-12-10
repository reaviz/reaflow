import React, { useState } from 'react';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from 'types';
import { removeNode } from './externalHelpers';

export interface SelectionProps {
  selections?: string[];
  nodes?: NodeData[];
  edges?: EdgeData[];
  onSelection?: (value: string[]) => void;
  onDataChange?: (nodes: NodeData[], edges: EdgeData[]) => void;
}

export interface SelectionResult {
  selections: string[];
  clearSelections: (value?: string[]) => void;
  addSelection: (value: string) => void;
  removeSelection: (value: string) => void;
  toggleSelection: (value: string) => void;
  setSelections: (value: string[]) => void;
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: any
  ) => void;
  onCanvasClick?: (event?: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>) => void;
}

export const useSelection = ({
  selections = [],
  nodes = [],
  edges = [],
  onSelection = () => undefined,
  onDataChange = () => undefined
}: SelectionProps): SelectionResult => {
  const [internalSelections, setInternalSelections] = useState<string[]>(
    selections
  );
  const [metaKeyDown, setMetaKeyDown] = useState<boolean>(false);

  const addSelection = (item: string) => {
    const has = internalSelections.includes(item);
    if (!has) {
      const next = [...internalSelections, item];
      onSelection(next);
      setInternalSelections(next);
    }
  };

  const removeSelection = (item: string) => {
    const has = internalSelections.includes(item);
    if (has) {
      const next = internalSelections.filter((i) => i !== item);
      onSelection(next);
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
    onSelection(next);
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
      category: 'Canvas',
      description: 'Select all nodes and edges',
      callback: (event) => {
        event.preventDefault();

        const next = nodes.map((n) => n.id);
        onDataChange(nodes, edges);
        onSelection(next);
        setInternalSelections(next);
      }
    },
    {
      name: 'Delete Selections',
      category: 'Canvas',
      description: 'Delete selected nodes and edges',
      keys: 'backspace',
      callback: (event) => {
        event.preventDefault();

        const result = removeNode(nodes, edges, internalSelections);

        onDataChange(result.nodes, result.edges);
        onSelection([]);

        setInternalSelections([]);
      }
    },
    {
      name: 'Deselect Selections',
      category: 'Canvas',
      description: 'Deselect selected nodes and edges',
      keys: 'escape',
      callback: (event) => {
        event.preventDefault();
        onSelection([]);
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
