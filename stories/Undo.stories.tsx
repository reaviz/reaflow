import {
  Meta,
  Story
} from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import {
  UndoRedoEvent,
  UndoRedoHistory,
  useUndo
} from '../src/helpers';
import {
  Add,
  Arrow,
  Edge,
  Icon,
  Label,
  MarkerArrow,
  Node,
  Port,
  Remove
} from '../src/symbols';

export default {
  title: 'Demos/Undo Redo',
  component: Canvas,
  argTypes: {
    initialHistory: {
      control: {
        // TODO make it readonly when it'll be possible - See https://github.com/storybookjs/storybook/issues/14048
        disable: true
      }
    }
  },
  subcomponents: {
    Node,
    Edge,
    MarkerArrow,
    Arrow,
    Icon,
    Label,
    Port,
    Remove,
    Add
  }
} as Meta;

export const Simple: Story = () => {
  const [nodes, setNodes] = useState<any[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    },
    {
      id: '3',
      text: 'Node 3'
    }
  ]);

  const [edges, setEdges] = useState<any[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    },
    {
      id: '1-3',
      from: '1',
      to: '3'
    }
  ]);

  const { undo, redo, canUndo, canRedo } = useUndo({
    nodes,
    edges,
    onUndoRedo: (state: UndoRedoEvent) => {
      console.log('Undo / Redo', state);
      setEdges(state.edges);
      setNodes(state.nodes);
    }
  });

  const addNode = () => {
    setNodes([
      ...nodes,
      {
        id: `a${Math.random()}`,
        text: `Node ${Math.random()}`
      }
    ]);
  };

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <button
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
        onClick={addNode}
      >
        Add Nodes
      </button>
      <button
        style={{ position: 'absolute', top: 10, left: 100, zIndex: 999 }}
        onClick={undo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        style={{ position: 'absolute', top: 10, left: 160, zIndex: 999 }}
        onClick={redo}
        disabled={!canRedo}
      >
        Redo
      </button>
      <Canvas
        nodes={nodes}
        edges={edges}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const WithInitialHistory: Story = () => {
  const initialHistory: UndoRedoHistory = [
    {
      nodes: [],
      edges: []
    },
    {
      nodes: [
        {
          id: '1',
          text: 'Node 1'
        }
      ],
      edges: []
    },
    {
      nodes: [
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        }
      ],
      edges: [
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]
    },
    {
      nodes: [
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ],
      edges: [
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]
    }
  ];
  const [nodes, setNodes] = useState<any[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    },
    {
      id: '3',
      text: 'Node 3'
    }
  ]);

  const [edges, setEdges] = useState<any[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    },
    {
      id: '1-3',
      from: '1',
      to: '3'
    }
  ]);

  const { undo, redo, canUndo, canRedo } = useUndo({
    nodes,
    edges,
    initialHistory,
    onUndoRedo: (state: UndoRedoEvent) => {
      console.log('Undo / Redo', state);
      setEdges(state.edges);
      setNodes(state.nodes);
    }
  });

  const addNode = () => {
    setNodes([
      ...nodes,
      {
        id: `a${Math.random()}`,
        text: `Node ${Math.random()}`
      }
    ]);
  };

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <button
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
        onClick={addNode}
      >
        Add Nodes
      </button>
      <button
        style={{ position: 'absolute', top: 10, left: 100, zIndex: 999 }}
        onClick={undo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        style={{ position: 'absolute', top: 10, left: 160, zIndex: 999 }}
        onClick={redo}
        disabled={!canRedo}
      >
        Redo
      </button>
      <Canvas
        nodes={nodes}
        edges={edges}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};
