import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add, NodeProps, EdgeProps } from '../src/symbols';
import { UndoRedoEvent, useUndo } from '../src/helpers';

export default {
  title: 'Demos/Undo Redo',
  component: Canvas,
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
};

export const Simple = () => {
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
