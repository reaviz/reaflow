import React from 'react';
import { Canvas } from './Canvas';

const nodes = [
  {
    id: '1'
  },
  {
    id: '2'
  },
  {
    id: '3'
  }
];

export const Simple = () => (
  <div style={{ border: 'solid 1px blue', height: 500, width: 500 }}>
    <Canvas
      nodes={nodes}
      edges={[
        {
          id: '1-2',
          from: nodes[0],
          to: nodes[1]
        },
        {
          id: '1-3',
          from: nodes[0],
          to: nodes[2]
        }
      ]}
    />
  </div>
);

export default {
  title: 'Canvas',
  component: Canvas
};
