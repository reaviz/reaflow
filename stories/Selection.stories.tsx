import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { useHotkeys } from 'reakeys';
import { EdgeData, NodeData } from '../src/types';

export const Simple = () => {
  const [selections, setSelections] = useState<string[]>([]);

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
              setSelections([node.id]);
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([edge.id]);
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

export const Defaults = () => {
  const [selections, setSelections] = useState<string[]>(['1', '2']);

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
              setSelections([node.id]);
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([edge.id]);
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


export const Hotkeys = () => {
  const [selections, setSelections] = useState<string[]>([]);

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

  useHotkeys([
    {
      name: 'Select All',
      keys: 'mod+a',
      callback: event => {
        event.preventDefault();
        setSelections(nodes.map(n => n.id));
      }
    },
    {
      name: 'Delete Selections',
      keys: 'backspace',
      callback: event => {
        event.preventDefault();
        setNodes(nodes.filter(n => !selections.includes(n.id)));
        setEdges(edges.filter(e => !selections.includes(e.from) || !selections.includes(e.to)));
        setSelections([]);
      }
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
