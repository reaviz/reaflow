import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add, NodeProps } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';

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

export const NestedEdges = () => {
  const nodeDimensions : any = {
    typeA: {
      width: 190,
      height: 150
    },
    typeB:{
      width: 80,
      height: 80
    }
  }
  const nodes: NodeData[]= [
    {
      id: '1',
      text: '1',
    },
    {
      id: '2',
      label: 'A',
      name: 'Process XYZ',
      description: 'Description of XYZ',
      // describes padding for nested nodes
      nodePadding: [120, 50, 50, 50],
      ...nodeDimensions.typeA
    },
    {
      id: '2.1',
      parent: '2',
      label: 'B',
      name: 'Task 1',
      ...nodeDimensions.typeB
    },
    {
      id: '2.1.1',
      parent: '2.1',
      label: 'B',
      name: 'Task 1',
      ...nodeDimensions.typeB
    },
    {
      id: '2.2',
      parent: '2',
      label: 'B',
      name: 'Task 2',
      ...nodeDimensions.typeB
    },
    {
      id: '3',
      text: '3'
    }
  ];
  const edges: EdgeData[] = [
    {
      id: '1-2.1',
      from: '1',
      to: '2.1'
    },
    {
      id: '1-2.1.1',
      from: '1',
      to: '2.1.1'
    },
    {
      id: '2.1-2.2',
      parent: '2',
      from: '2.1',
      to: '2.2'
    },
    {
      id: '2.2-3',
      from: '2.2',
      to: '3'
    },
  ];

  function prepareNode(node){
    const data = node.properties;
    switch (data.label){
      case 'A':
        return (
          <Node style={{fill: '#1b1d3c', opacity: 0.8}}>
            <div style={{textAlign: "center"}}>
              <h4>{data.name}</h4>
              <p>{data.description}</p>
            </div>
          </Node>
        )
      case 'B':
        return (
          <Node style={{fill: '#0e0f1f'}}>
            <div style={{textAlign: "center"}}>
              <h4>{data.name}</h4>
            </div>
          </Node>
        )
      default:
        return (
          <Node/>
        )
    }
  }

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        // required to enable edges from/to nested nodes
        layoutOptions={{'elk.hierarchyHandling':'INCLUDE_CHILDREN'}}
        direction='RIGHT'
        nodes={nodes}
        edges={edges}
        node={(node: NodeProps) => prepareNode(node)}
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
