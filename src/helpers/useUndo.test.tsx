import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { EdgeData, NodeData } from '../types';
import { UndoRedoEvent, useUndo } from './useUndo';

// jest.disableAutomock(); XXX Don't know what that does, it was used in other tests

/**
 * Mock component for testing. Used to trigger undo/redo action and see if states updates accordingly.
 */
const UndoRedoTestComponent = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);

  const { undo, redo, canUndo, canRedo, clear, history } = useUndo({
    nodes,
    edges,
    onUndoRedo: (state: UndoRedoEvent) => {
      // console.log('Undo / Redo', state);

      setNodes(state?.nodes);
      setEdges(state?.edges);
    }
  });

  // console.log('history', history()) // This crashes, see https://github.com/reaviz/reaflow/issues/66#issuecomment-785278040

  return (
    <div>
      <div data-testid={'output'}>
        There are {nodes?.length} nodes and {edges?.length} edges.
      </div>

      <button
        onClick={() => {
          const newNode: NodeData = {
            id: `node-${Math.random()}`
          };

          setNodes([...nodes, newNode]);
        }}
      >
        Add node
      </button>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

describe('helpers/useUndo.ts', () => {
  test('should allow to undo/redo', () => {
    // Renders the component, make "screen" available
    render(<UndoRedoTestComponent />);

    fireEvent.click(screen.getByText('Add node'));
    fireEvent.click(screen.getByText('Add node'));
    expect(
      screen.getByTestId('output'),
      'Failed to add 2 nodes'
    ).toHaveTextContent('There are 2 nodes and 0 edges.');

    fireEvent.click(screen.getByText('Undo'));
    expect(
      screen.getByTestId('output'),
      'Failed to undo once'
    ).toHaveTextContent('There are 1 nodes and 0 edges.');

    fireEvent.click(screen.getByText('Redo'), 'Failed to redo once');
    expect(screen.getByTestId('output')).toHaveTextContent(
      'There are 2 nodes and 0 edges.'
    );

    fireEvent.click(screen.getByText('Undo'));
    fireEvent.click(screen.getByText('Undo'));
    expect(
      screen.getByTestId('output'),
      'Failed to undo twice'
    ).toHaveTextContent('There are 0 nodes and 0 edges.');
  });
});
