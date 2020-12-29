import React, { useState } from 'react';
import { NodeData } from '../src/types';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { detectCircular, hasLink } from '../src/helpers';

export const LabelsAndIcons = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '2',
          text: 'Node 2',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '3',
          text: 'Node 3',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
            height: 25,
            width: 25
          }
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
      node={
        <Node
          icon={<Icon />}
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Icons = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          height: 50,
          width: 50,
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '2',
          height: 50,
          width: 50,
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '3',
          height: 50,
          width: 50,
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
            height: 25,
            width: 25
          }
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
      node={
        <Node
          icon={<Icon />}
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const LinkingNodeRestrictions = () => {
  const [nodes] = useState<any[]>([
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
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onNodeLinkCheck={(from: NodeData, to: NodeData) => {
          if (from.id === to.id || to.id === '3') {
            return false;
          }

          if (hasLink(edges, from, to)) {
            return false;
          }

          if (detectCircular(nodes, edges, from, to)) {
            return false;
          }

          return true;
        }}
        onNodeLink={(from, to) => {
          const id = `${from.id}-${to.id}`;

          setEdges([
            ...edges,
            {
              id,
              from: from.id,
              to: to.id
            }
          ]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const LinkingNodes = () => {
  const [nodes] = useState<any[]>([
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
              to: to.id
            }
          ]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const DynamicNodes = () => {
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <button
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
        onClick={() => setNodes([...nodes, { id: `a${Math.random()}`, text: `Node ${Math.random()}` }])}
      >
        Add Nodes
      </button>
      <Canvas
        nodes={nodes}
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
          }
        ]}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const ForeignObjects = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          height: 125,
          width: 250,
          data: {
            value: 50
          }
        },
        {
          id: '2',
          height: 125,
          width: 250,
          data: {
            value: 25
          }
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
        <Node>
          {event => (
            <foreignObject height={event.height} width={event.width} x={0} y={0}>
              <div style={{ padding: 10, textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>Age</h3>
                <input type="range" min="1" max="100" value={event.node.data.value} />
              </div>
            </foreignObject>
          )}
        </Node>
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const VariableSizes = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          height: 50,
          width: 50
        },
        {
          id: '2',
          text: 'Node 2',
          height: 80,
          width: 250
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

export const LongLabels = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '2',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '3',
          text: 'Node 3 with a long label for testing',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '4',
          text: 'Node4withalongnobreakingspacelabel',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
            height: 25,
            width: 25
          }
        },
        {
          id: '5',
          text: 'asdf asdf asdfddd dssss asdfdsds sdssd'
        },
        {
          id: '6',
          text: 'normal label'
        },
        {
          id: '7',
          height: 70,
          width: 70,
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
            height: 42,
            width: 42
          }
        },
        {
          id: '8',
          icon: {
            url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
            height: 42,
            width: 42
          }
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
          id: '2-7',
          from: '2',
          to: '7'
        },
        {
          id: '2-4',
          from: '2',
          to: '4'
        },
        {
          id: '4-5',
          from: '4',
          to: '5'
        },
        {
          id: '4-6',
          from: '4',
          to: '6'
        },
        {
          id: '4-8',
          from: '4',
          to: '8'
        }
      ]}
      node={
        <Node
          icon={<Icon />}
        />
      }
    />
  </div>
);

export default {
  title: 'Demos/Nodes',
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
