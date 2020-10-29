import React from 'react';
import { Canvas } from './Canvas';

const nodes = [
  {
    id: '1',
    x: 50,
    y: 50
  },
  {
    id: '2',
    x: 150,
    y: 150
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
        }
      ]}
    />
  </div>
);

export default {
  title: 'Canvas',
  component: Canvas
};
