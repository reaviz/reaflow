import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, NodeProps, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData, PortData } from '../src/types';

export default {
  title: 'Demos/Ports',
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
          text: 'Node 1',
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
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
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
              side: 'NORTH'
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
        }
      ]}
      node={
        <Node
          port={
            <Port
              onClick={(e, node) => {
                console.log('onClick port: ', node);
              }}
              onEnter={(e, node) => {
                console.log('onEnter port: ', node);
              }}
              onLeave={(e, node) => {
                console.log('onLeave port: ', node);
              }}
              style={{ fill: 'blue', stroke: 'white' }}
              rx={10}
              ry={10}
            />
          }
        />
      }
      onLayoutChange={(layout) => console.log('Layout', layout)}
    />
  </div>
);

export const Disabled = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          ports: [
            {
              id: '1-from',
              width: 10,
              height: 10,
              side: 'SOUTH',
              disabled: true
            },
            {
              id: '1-to',
              width: 10,
              height: 10,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
          ports: [
            {
              id: '2-from',
              width: 10,
              height: 10,
              side: 'SOUTH',
              disabled: true
            },
            {
              id: '2-to',
              width: 10,
              height: 10,
              side: 'NORTH'
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
        }
      ]}
      node={
        <Node
          port={
            <Port
              onClick={(e, node) => {
                console.log('onClick port: ', node);
              }}
              onEnter={(e, node) => {
                console.log('onEnter port: ', node);
              }}
              onLeave={(e, node) => {
                console.log('onLeave port: ', node);
              }}
              style={{ fill: 'blue', stroke: 'white' }}
              rx={10}
              ry={10}
            />
          }
        />
      }
      onLayoutChange={(layout) => console.log('Layout', layout)}
    />
  </div>
);

export const Styled = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <style>
      {`
        .blue {
          fill: blue;
        }
        .green {
          fill: green;
        }
      `}
    </style>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
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
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
          ports: [
            {
              id: '2-from',
              width: 10,
              height: 10,
              side: 'SOUTH',
              className: 'green'
            },
            {
              id: '2-to',
              width: 10,
              height: 10,
              side: 'NORTH',
              className: 'blue'
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
        }
      ]}
      onLayoutChange={(layout) => console.log('Layout', layout)}
    />
  </div>
);

export const ComplexPorts = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          ports: [
            {
              id: '1-from-1',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-from-2',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-from-3',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-to',
              width: 10,
              height: 10,
              hidden: true,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
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
              hidden: true,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '3',
          text: 'Node 3',
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
              hidden: true,
              side: 'NORTH'
            }
          ]
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2',
          fromPort: '1-from-1',
          toPort: '2-to'
        },
        {
          id: '1-3',
          from: '1',
          to: '3',
          fromPort: '1-from-3',
          toPort: '3-to'
        }
      ]}
      onLayoutChange={(layout) => console.log('Layout', layout)}
    />
  </div>
);

export const LinkingPortRestrictions = () => {
  const [nodes] = useState<any[]>([
    {
      id: '1',
      text: 'Node 1',
      ports: [
        {
          id: '1-from-1',
          width: 10,
          height: 10,
          side: 'SOUTH'
        },
        {
          id: '1-from-2',
          width: 10,
          height: 10,
          side: 'SOUTH'
        },
        {
          id: '1-to',
          width: 10,
          height: 10,
          hidden: true,
          side: 'NORTH'
        }
      ]
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
      to: '2',
      fromPort: '1-from-1',
      toPort: '2-to'
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onNodeLinkCheck={(_event, from: NodeData, to: NodeData, port: PortData) => {
          if (from.id === to.id || to.id === '1') {
            return false;
          }

          if (port?.id === '1-from-2' && to.id === '3') {
            return false;
          }

          return true;
        }}
        onNodeLink={(_event, from: NodeData, to: NodeData, port: PortData) => {
          const id = `${from.id}-${to.id}`;

          setEdges([
            ...edges,
            {
              id,
              from: from.id,
              to: to.id,
              fromPort: port.id,
              toPort: `${to.id}-to`
            }
          ]);
        }}
        onLayoutChange={(layout) => console.log('Layout', layout)}
      />
    </div>
  );
};

export const DynamicPorts = () => {
  const [activeNode, setActiveNode] = useState<string>('');
  const initialNodes: NodeData<any>[] = [
    {
      id: '1',
      text: 'Main',
      ports: [
        {
          id: '1-from',
          width: 10,
          height: 10,
          side: 'EAST'
        }
      ]
    },
    {
      id: '2',
      text: ' ',
      ports: [
        {
          id: '2-from',
          width: 10,
          height: 10,
          side: 'EAST'
        }
      ],
      data: {
        label: '2-1'
      }
    },
    {
      id: '3',
      text: ' ',
      ports: [
        {
          id: '3-from',
          width: 10,
          height: 10,
          side: 'EAST'
        }
      ],
      data: {
        label: '2-2'
      }
    }
  ];

  const initialEdges = [
    {
      id: '1-2',
      from: '1',
      to: '2',
      fromPort: '1-from'
    },
    {
      id: '1-3',
      from: '1',
      to: '3',
      fromPort: '1-from'
    }
  ];

  const getNodesAndEdges = (activeNode: string) => {
    const otherNodes: NodeData<any>[] = [];
    const otherEdges: EdgeData<any>[] = [];

    if (activeNode === '2') {
      otherNodes.push({ id: '4', text: '4' });
      otherEdges.push({ id: '2-4', from: '2', fromPort: '2-from', to: '4' });
    } else if (activeNode === '3') {
      otherNodes.push({ id: '5', text: '5' });
      otherEdges.push({ id: '3-5', from: '3', fromPort: '3-from', to: '5' });
    }

    return { nodes: [...initialNodes, ...otherNodes], edges: [...initialEdges, ...otherEdges] };
  };

  const { nodes, edges } = getNodesAndEdges(activeNode);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        direction="RIGHT"
        maxWidth={3000}
        nodes={nodes}
        edges={edges}
        node={(node: NodeProps) => {
          if (node.properties.text === ' ') {
            return (
              <Node>
                {() => (
                  <foreignObject height={node.height} width={node.width}>
                    <div style={{ width: node.width, height: node.height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} onClick={() => setActiveNode(node.id)}>
                      {node.properties.data.label}
                    </div>
                  </foreignObject>
                )}
              </Node>
            );
          }
          return <Node {...node} />;
        }}
      />
    </div>
  );
};
