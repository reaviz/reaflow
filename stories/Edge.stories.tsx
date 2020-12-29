import React, { useState} from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { upsertNode } from '../src/helpers';
import { EdgeData, NodeData } from '../src/types';

export const Adding = () => {
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        edge={
          <Edge
            add={<Add hidden={false} />}
            onAdd={(event, edge) => {
              const id = `node-${Math.random()}`;
              const newNode = {
                id,
                text: id
              };

              const results = upsertNode(nodes, edges, edge, newNode);
              setNodes(results.nodes);
              setEdges(results.edges);
            }}
          />
        }
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const NoEdges = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
      edges={[]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Labels = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
          to: '2',
          text: 'Label 1-2'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export default {
  title: 'Demos/Edges',
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
