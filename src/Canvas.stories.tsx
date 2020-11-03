import React from 'react';
import { Canvas } from './Canvas';

const simpleNodes = [
  {
    id: '1'
  },
  {
    id: '2'
  }
];

export const Simple = () => (
  <div style={{ border: 'solid 1px blue', height: 500, width: 500 }}>
    <Canvas
      nodes={simpleNodes}
      edges={[
        {
          id: '1-2',
          from: simpleNodes[0],
          to: simpleNodes[1]
        }
      ]}
    />
  </div>
);

const joinNodes = [
  {
    id: '1'
  },
  {
    id: '2'
  },
  {
    id: '3'
  },
  {
    id: '4'
  }
];

export const Joins = () => (
  <div style={{ border: 'solid 1px blue', height: 500, width: 500 }}>
    <Canvas
      nodes={joinNodes}
      edges={[
        {
          id: '1-2',
          from: joinNodes[0],
          to: joinNodes[1]
        },
        {
          id: '1-3',
          from: joinNodes[0],
          to: joinNodes[2]
        },
        {
          id: '2-3',
          from: joinNodes[2],
          to: joinNodes[3]
        },
        {
          id: '2-4',
          from: joinNodes[1],
          to: joinNodes[3]
        }
      ]}
    />
  </div>
);

export default {
  title: 'Canvas',
  component: Canvas
};
