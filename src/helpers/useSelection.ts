import React, { useState } from 'react';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from '../types';
import { removeNode } from './crudHelpers';

export interface SelectionProps {
  /**
   * Current selections.
   *
   * Contains both nodes and edges ids.
   */
  selections?: string[];

  /**
   * Node datas.
   */
  nodes?: NodeData[];

  /**
   * Edge datas.
   */
  edges?: EdgeData[];

  /**
   * Disabled or not.
   */
  disabled?: boolean;

  /**
   * On selection change.
   */
  onSelection?: (newSelectedIds: string[]) => void;

  /**
   * On data change.
   */
  onDataChange?: (nodes: NodeData[], edges: EdgeData[]) => void;
}

export interface SelectionResult {
  /**
   * Selections id array (of nodes and edges).
   */
  selections: string[];

  /**
   * Clear selections method.
   */
  clearSelections: (value?: string[]) => void;

  /**
   * A selection method.
   */
  addSelection: (value: string) => void;

  /**
   * Remove selection method.
   */
  removeSelection: (value: string) => void;

  /**
   * Toggle existing selection on/off method.
   */
  toggleSelection: (value: string) => void;

  /**
   * Set internal selections.
   */
  setSelections: (value: string[]) => void;

  /**
   * On click event pass through.
   */
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: any
  ) => void;

  /**
   * On canvas click event pass through.
   */
  onCanvasClick?: (event?: React.MouseEvent<SVGGElement, MouseEvent>) => void;

  /**
   * On keydown event pass through.
   */
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>) => void;
}

export const useSelection = ({
  selections = [],
  nodes = [],
  edges = [],
  disabled,
  onSelection,
  onDataChange
}: SelectionProps): SelectionResult => {
  const [internalSelections, setInternalSelections] = useState<string[]>(
    selections
  );
  const [metaKeyDown, setMetaKeyDown] = useState<boolean>(false);

  const addSelection = (item: string) => {
    if (!disabled) {
      const has = internalSelections.includes(item);
      if (!has) {
        const next = [...internalSelections, item];
        onSelection?.(next);
        setInternalSelections(next);
      }
    }
  };

  const removeSelection = (item: string) => {
    if (!disabled) {
      const has = internalSelections.includes(item);
      if (has) {
        const next = internalSelections.filter((i) => i !== item);
        onSelection?.(next);
        setInternalSelections(next);
      }
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
    if (!disabled) {
      setInternalSelections(next);
      onSelection?.(next);
    }
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

        if (!disabled) {
          const next = nodes.map((n) => n.id);
          onDataChange?.(nodes, edges);
          onSelection?.(next);
          setInternalSelections(next);
        }
      }
    },
    {
      name: 'Delete Selections',
      category: 'Canvas',
      description: 'Delete selected nodes and edges',
      keys: 'backspace',
      callback: (event) => {
        if (!disabled) {
          event.preventDefault();
          const result = removeNode(nodes, edges, internalSelections);
          onDataChange?.(result.nodes, result.edges);
          onSelection?.([]);
          setInternalSelections([]);
        }
      }
    },
    {
      name: 'Deselect Selections',
      category: 'Canvas',
      description: 'Deselect selected nodes and edges',
      keys: 'escape',
      callback: (event) => {
        if (!disabled) {
          event.preventDefault();
          onSelection?.([]);
          setInternalSelections([]);
        }
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
