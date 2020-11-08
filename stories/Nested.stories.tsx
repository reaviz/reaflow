import React from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';

export const Simple = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
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

export const Edges = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
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

export const NestedNesting = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
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
          parent: '2'
        },
        {
          id: '2-1-2',
          text: '2-1-2',
          parent: '2',
        },
        {
          id: '2-1-1-1',
          text: '2.1 > 2.1.2',
          parent: '2-1-1'
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
