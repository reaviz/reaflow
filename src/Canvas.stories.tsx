import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { Node, Edge, MarkerArrow, Port, Icon } from './symbols';

export const Simple = () => (
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Icons = () => (
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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

export const NoEdges = () => (
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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

export const Joins = () => (
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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
  const [selections, setSelections] = useState<any[]>([]);

  return (
    <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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

export const Events = () => (
  <div style={{ border: 'solid 1px #12131e', height: 650, width: 650 }}>
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
        />
      }
      onCanvasClick={(event) => {
        console.log('Canvas Clicked', event);
      }}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export default {
  title: 'Canvas',
  component: Canvas,
  parameters: {
    actions: {
      argTypesRegex: '^on.*'
    }
  },
  subcomponents: {
    Node,
    Edge,
    MarkerArrow
  }
};
