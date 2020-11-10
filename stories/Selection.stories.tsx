import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { useSelection } from '../src/utils/useSelection';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';
import { removeAndUpsertNodes } from '../src/utils';

export const Defaults = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
    nodes,
    edges,
    selections: ['1'],
    onSelection: (n, e, s) => {
      console.info('Selection', n, e, s);
      setNodes(n);
      setEdges(e);
    }
  });

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={
          <Node
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onRemove={(event, node) => {
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              clearSelections();
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              onClick(event, edge);
            }}
          />
        }
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const Simple = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
    nodes,
    edges,
    onSelection: (n, e, s) => {
      console.info('Selection', n, e, s);
      setNodes(n);
      setEdges(e);
    }
  });

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={[
          {
            id: '1',
            text: 'Node 1'
          },
          {
            id: '2',
            text: 'Node 2'
          }
        ]}
        edges={[
          {
            id: '1-2',
            from: '1',
            to: '2'
          }
        ]}
        selections={selections}
        node={
          <Node
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onRemove={(event, node) => {
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              clearSelections();
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              onClick(event, edge);
            }}
          />
        }
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const ManualSelection = () => {
  const [selections, setSelections] = useState<string[]>([]);
  const [nodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={
          <Node
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              setSelections([...selections, node.id]);
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([...selections, edge.id]);
            }}
          />
        }
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          setSelections([]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export default {
  title: 'Demos/Selections',
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
