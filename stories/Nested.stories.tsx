import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';

export const Simple = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
        },
        {
          id: '2-1-1',
          text: '2 > 2.1',
          parent: '2'
        },
        {
          id: '3',
          text: '3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '2-3',
          from: '2',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Linking = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
    },
    {
      id: '2.1',
      text: '2 > 2.1',
      parent: '2'
    },
    {
      id: '2.2',
      text: '2 > 2.2',
      parent: '2'
    },
    {
      id: '3',
      text: '3'
    }
  ]);
  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    },
    {
      id: '2-3',
      from: '2',
      to: '3'
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onNodeLink={(from: NodeData, to: NodeData) => {
          const id = `${from.id}-${to.id}`;
          setEdges([
            ...edges,
            {
              id,
              from: from.id,
              to: to.id,
              parent: to.parent
            }
          ]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const Edges = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2'
        },
        {
          id: '2-1-1',
          text: '2 > 1.1',
          parent: '2'
        },
        {
          id: '2-1-2',
          text: '2 > 1.2',
          parent: '2'
        },
        {
          id: '2-1-3',
          text: '2 > 1.3',
          parent: '2'
        },
        {
          id: '3',
          text: '3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '2-1-1>2-1-2',
          from: '2-1-1',
          to: '2-1-2',
          parent: '2'
        },
        {
          id: '2-1-1>2-1-3',
          from: '2-1-1',
          to: '2-1-3',
          parent: '2'
        },
        {
          id: '2-3',
          from: '2',
          to: '3'
        },
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Ports = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1',
          ports: [
            {
              id: '1-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-to',
              width: 10,
              height: 10,
              side: 'NORTH',
              hidden: true
            }
          ]
        },
        {
          id: '2',
          ports: [
            {
              id: '2-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '2-to',
              width: 10,
              height: 10,
              side: 'NORTH',
              hidden: true
            }
          ]
        },
        {
          id: '2-1-1',
          text: '2 > 1.1',
          parent: '2',
          ports: [
            {
              id: '211-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            }
          ]
        },
        {
          id: '2-1-2',
          text: '2 > 1.2',
          parent: '2',
          ports: [
            {
              id: '212-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '212-to',
              width: 10,
              height: 10,
              side: 'NORTH',
              hidden: true
            }
          ]
        },
        {
          id: '2-1-3',
          text: '2 > 1.3',
          parent: '2'
        },
        {
          id: '3',
          text: '3',
          ports: [
            {
              id: '3-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '3-to',
              width: 10,
              height: 10,
              side: 'NORTH',
              hidden: true
            }
          ]
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2',
          fromPort: '1-from',
          toPort: '2-to'
        },
        {
          id: '2-1-1>2-1-2',
          from: '2-1-1',
          to: '2-1-2',
          parent: '2',
          fromPort: '211-from',
          toPort: '212-to'
        },
        {
          id: '2-1-1>2-1-3',
          from: '2-1-1',
          to: '2-1-3',
          parent: '2'
        },
        {
          id: '2-3',
          from: '2',
          to: '3',
          fromPort: '2-from',
          toPort: '3-to'
        },
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const NestedNesting = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
        },
        {
          id: '2.1',
          parent: '2'
        },
        {
          id: '2.1.1',
          text: '2.1.1',
          parent: '2.1'
        },
        {
          id: '2.1.2',
          text: '2.1.2',
          parent: '2.1'
        },
        {
          id: '2.1.3',
          text: '2.1.3',
          parent: '2.1'
        },
        {
          id: '2.2',
          text: '2.2',
          parent: '2'
        },
        {
          id: '3',
          text: '3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '2-3',
          from: '2',
          to: '3'
        },
        {
          id: '2.1>2.2',
          from: '2.1',
          to: '2.2',
          parent: '2'
        },
        {
          id: '2.1.1>2.1.2',
          from: '2.1.1',
          to: '2.1.2',
          parent: '2.1'
        },
        {
          id: '2.1.1>2.1.3',
          from: '2.1.1',
          to: '2.1.3',
          parent: '2.1'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export default {
  title: 'Demos/Nested',
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
