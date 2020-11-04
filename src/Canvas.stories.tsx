import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { Node, Edge, MarkerArrow, Port } from './symbols';

export const Simple = () => (
  <div style={{ border: 'solid 1px blue', height: 650, width: 650 }}>
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
    />
  </div>
);

export const Labels = () => (
  <div style={{ border: 'solid 1px blue', height: 650, width: 650 }}>
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
    />
  </div>
);

export const Joins = () => (
  <div style={{ border: 'solid 1px blue', height: 650, width: 650 }}>
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
    />
  </div>
);

export const Selections = () => {
  const [selections, setSelections] = useState<any[]>([]);

  return (
    <div style={{ border: 'solid 1px blue', height: 650, width: 650 }}>
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
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          setSelections([]);
        }}
      />
    </div>
  );
};

export const Events = () => (
  <div style={{ border: 'solid 1px blue', height: 650, width: 650 }}>
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
