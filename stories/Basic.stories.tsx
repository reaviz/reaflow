import { Popover } from 'reablocks';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, CanvasRef } from '../src/Canvas';
import { createEdgeFromNodes, detectCircular, hasLink } from '../src/helpers';
import '../src/index.css';
import { Add, Arrow, Edge, EdgeProps, Icon, Label, MarkerArrow, Node, NodeProps, Port, Remove } from '../src/symbols';
import { CanvasPosition, EdgeData, NodeData } from '../src/types';
import { popoverTheme } from '../test/PopoverTheme';

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

export const Simple = () => (
  <div style={{ height: 500 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
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

export const NoAnimation = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      animated={false}
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
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

export const Readonly = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      readonly={true}
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
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

export const Disabled = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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

export const CustomElements = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '2',
          text: 'Mother',
          data: {
            gender: 'female'
          }
        },
        {
          id: '3',
          text: 'Daughter',
          data: {
            gender: 'female'
          }
        },
        {
          id: '4',
          text: 'Son',
          data: {
            gender: 'male'
          }
        },
      ]}
      edges={[
        {
          id: '2-3',
          from: '2',
          to: '3'
        },
        {
          id: '2-4',
          from: '2',
          to: '4'
        }
      ]}
      node={(node: NodeProps) => (
        <Node
          {...node}
          onClick={() => console.log(node.properties.data)}
          style={{ fill: node.properties.data?.gender === 'male' ? 'blue' : 'red' }}
          tooltip={(props) => (
            <Popover
              theme={popoverTheme}
              trigger={'hover'}
              closeOnClick={true}
              content={
                <div>
                  <h1>This is {node.properties.text}!</h1>
                  <p>you can also use Popover from other libraries such as Antd</p>
                </div>
              }
            >
              {props.children}
            </Popover>
          )}
        />

      )}
      edge={(edge: EdgeProps) => (
        <Edge
          {...edge}
          style={{ stroke: edge.id === '2-4' ? 'blue' : 'red' }}
        />
      )}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Refs = () => {
  const ref = useRef<CanvasRef | null>(null);

  useEffect(() => {
    console.log('Reference:', ref);
  }, [ref]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <button
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
        onClick={() => ref.current?.positionCanvas(CanvasPosition.CENTER)}
      >
        Center
      </button>
      <Canvas
        ref={ref}
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
};

export const Events = () => (
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
      onCanvasClick={event => {
        console.log('Canvas Clicked', event);
      }}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Styling = () => (
  <div style={{ border: 'solid 1px #12131e', height: 500, width: 700 }}>
    <style>
      {`
        body #root > div {
          background-color: white;
          background-image: -webkit-repeating-radial-gradient(top center,rgba(0,0,0,.2),rgba(0,0,0,.2) 1px,transparent 0,transparent 100%);
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

export const ManyNodes = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    },
    {
      id: '3',
      text: '3'
    },
    {
      id: '4',
      text: '4'
    },
    {
      id: '5',
      text: '5'
    },
    {
      id: '6',
      text: '6'
    },
    {
      id: '7',
      text: '7'
    },
    {
      id: '8',
      text: '8'
    },
    {
      id: '9',
      text: '9'
    },
    {
      id: '10',
      text: '10'
    },
    {
      id: '11',
      text: '11'
    },
    {
      id: '12',
      text: '12'
    },
    {
      id: '13',
      text: '13'
    },
    {
      id: '14',
      text: '14'
    },
    {
      id: '15',
      text: '15'
    },
    {
      id: '16',
      text: '16'
    },
    {
      id: '17',
      text: '17'
    },
    {
      id: '18',
      text: '18'
    },
    {
      id: '19',
      text: '19'
    },
    {
      id: '20',
      text: '20'
    },
    {
      id: '21',
      text: '21'
    },
    {
      id: '22',
      text: '22'
    },
    {
      id: '23',
      text: '23'
    },
    {
      id: '24',
      text: '24'
    },
    {
      id: '25',
      text: '25'
    },
    {
      id: '26',
      text: '26'
    },
    {
      id: '27',
      text: '27'
    },
    {
      id: '28',
      text: '28'
    },
    {
      id: '29',
      text: '29'
    },
    {
      id: '30',
      text: '30'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
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
      id: '1-4',
      from: '1',
      to: '4'
    },
    {
      id: '1-5',
      from: '1',
      to: '5'
    },
    {
      id: '1-6',
      from: '1',
      to: '6'
    },
    {
      id: '1-7',
      from: '1',
      to: '7'
    },
    {
      id: '2-8',
      from: '2',
      to: '8'
    },
    {
      id: '2-9',
      from: '2',
      to: '9'
    },
    {
      id: '2-10',
      from: '2',
      to: '10'
    },
    {
      id: '2-11',
      from: '2',
      to: '11'
    },
    {
      id: '2-12',
      from: '2',
      to: '12'
    },
    {
      id: '2-13',
      from: '2',
      to: '13'
    },
    {
      id: '3-14',
      from: '3',
      to: '14'
    },
    {
      id: '3-15',
      from: '3',
      to: '15'
    },
    {
      id: '3-16',
      from: '3',
      to: '16'
    },
    {
      id: '3-17',
      from: '3',
      to: '17'
    },
    {
      id: '3-18',
      from: '3',
      to: '18'
    },
    {
      id: '3-19',
      from: '3',
      to: '19'
    },
    {
      id: '3-20',
      from: '3',
      to: '20'
    },
    {
      id: '10-21',
      from: '10',
      to: '21'
    },
    {
      id: '10-22',
      from: '10',
      to: '22'
    },
    {
      id: '10-23',
      from: '10',
      to: '23'
    },
    {
      id: '10-24',
      from: '10',
      to: '24'
    },
    {
      id: '10-25',
      from: '10',
      to: '25'
    },
    {
      id: '17-26',
      from: '17',
      to: '26'
    },
    {
      id: '17-27',
      from: '17',
      to: '27'
    },
    {
      id: '17-28',
      from: '17',
      to: '28'
    },
    {
      id: '17-29',
      from: '17',
      to: '29'
    },
    {
      id: '17-30',
      from: '17',
      to: '30'
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onMouseEnter={() => undefined}
        onMouseLeave={() => undefined}
        onCanvasClick={() => undefined}
        dragNode={null}
        dragEdge={null}
        arrow={<Arrow />}
        node={
          <Node
            dragType="node"
            remove={<Remove />}
            port={<Port />}
            label={<Label />}
          />
        }
        edge={<Edge />}
        onLayoutChange={layout => console.log('Layout', layout)}
        onNodeLink={(_event, from, to) => {
          const newEdges = edges.filter(e => e.to !== from.id);

          setEdges([
            ...newEdges,
            createEdgeFromNodes(to, from)
          ]);
        }}
        onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
          if (from.id === to.id) {
            return false;
          }

          if (hasLink(edges, to, from)) {
            return false;
          }

          if (detectCircular(nodes, edges, to, from)) {
            return false;
          }

          return true;
        }}
      />
    </div>
  );
};

