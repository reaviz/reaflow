import React, { useState } from 'react';
import { EdgeData, NodeData } from '../src/types';
import { removeNode } from '../src/utils';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';

export const Simple = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Circular = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '2-2',
          from: '2',
          to: '2'
        },
        {
          id: '1-1',
          from: '1',
          to: '1'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Direction = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]}
      direction="RIGHT"
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Disabled = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      disabled={true}
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
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Joins = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
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
        },
        {
          id: '4',
          text: 'Node 4'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        },
        {
          id: '3-4',
          from: '3',
          to: '4'
        },
        {
          id: '2-4',
          from: '2',
          to: '4'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Selections = () => {
  const [selections, setSelections] = useState<string[]>([]);

  return (
    <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
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

export const Removeable = () => {
  const [selections, setSelections] = useState<string[]>(['1', '1-2']);
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
    <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={
          <Node
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              setSelections([node.id]);
            }}
            onRemove={(event, node) => {
              console.log('Removing Node', event, node);
              const result = removeNode(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              setSelections([]);
            }}
          />
        }
        edge={
          <Edge
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([edge.id]);
            }}
            onRemove={(event, edge) => {
              console.log('Removing Edge', event, edge);
              setEdges(edges.filter(e => e.id !== edge.id));
              setSelections([]);
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

export const Events = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
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
      node={
        <Node
          port={
            <Port
              onEnter={(event, port) => {
                console.log('Enter Port', event, port);
              }}
              onLeave={(event, port) => {
                console.log('Leave Port', event, port);
              }}
            />
          }
          onEnter={(event, node) => {
            console.log('Enter Node', event, node);
          }}
          onLeave={(event, node) => {
            console.log('Leave Node', event, node);
          }}
          onKeyDown={(event, node) => {
            console.log('Keydown Node', event, node);
          }}
          onClick={(event, node) => {
            console.log('Selecting Node', event, node);
          }}
          onRemove={(event, node) => {
            console.log('Remove Node', event, node);
          }}
        />
      }
      edge={
        <Edge
          onEnter={(event, edge) => {
            console.log('Enter Edge', event, edge);
          }}
          onLeave={(event, edge) => {
            console.log('Leave Edge', event, edge);
          }}
          onKeyDown={(event, edge) => {
            console.log('Keydown Edge', event, edge);
          }}
          onClick={(event, edge) => {
            console.log('Selecting Edge', event, edge);
          }}
          onRemove={(event, edge) => {
            console.log('Removing Edge', event, edge);
          }}
        />
      }
      onCanvasClick={(event) => {
        console.log('Canvas Clicked', event);
      }}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const CustomStyles = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <style>
      {`
        .canvas > div {
          background: white;
          background-image: -webkit-repeating-radial-gradient(top center,rgba(0,0,0,.8),rgba(0,0,0,.8) 1px,transparent 0,transparent 100%);
        }
        .edge {
          stroke: #b1b1b7;
          stroke-dasharray: 5;
          animation: dashdraw .5s linear infinite;
          stroke-width: 1;
        }
        @keyframes dashdraw {
          0% { stroke-dashoffset: 10; }
        }
      `}
    </style>
    <Canvas
      className="canvas"
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
              side: 'NORTH',
              hidden: true
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
              side: 'NORTH',
              hidden: true
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
          id: '1-3',
          from: '1',
          to: '3',
          fromPort: '1-from',
          toPort: '3-to'
        }
      ]}
      node={
        <Node
          style={{ stroke: '#1a192b', fill: 'white', strokeWidth: 1 }}
          label={<Label style={{ fill: 'black' }} />}
          port={<Port style={{ fill: 'blue', stroke: 'white' }} rx={10} ry={10} />}
        />
      }
      arrow={<MarkerArrow style={{ fill: '#b1b1b7' }} />}
      edge={<Edge className="edge" />}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export default {
  title: 'Demos/Basic',
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
