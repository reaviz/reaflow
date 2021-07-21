import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';
import { createEdgeFromNodes, removeAndUpsertNodes, useSelection } from '../src/helpers';

export default {
  title: 'Demos/Drag',
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

export const Simple = () => {
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
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
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
      id: '2-4',
      from: '2',
      to: '4'
    },
    {
      id: '2-5',
      from: '2',
      to: '5'
    },
    {
      id: '5-6',
      from: '5',
      to: '6'
    }
  ]);

  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  const { selections, onClick, onKeyDown, onCanvasClick } = useSelection({
    nodes,
    edges,
    onDataChange: (n, e) => {
      console.info('Data changed', n, e);
      setNodes(n);
      setEdges(e);
    },
    onSelection: (s) => {
      console.info('Selection', s);
    }
  });

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={
          <Node
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onEnter={(_event, node) => setEnteredNode(node)}
            onLeave={() => setEnteredNode(null)}
            onDragEnd={(_event, _coords, node) => {
              console.log('Entered Node:', enteredNode);
              console.log('Node to Move:', node);
              if (droppable && enteredNode) {
                const result = removeAndUpsertNodes(
                  nodes,
                  edges,
                  node
                );

                setEdges([
                  ...result.edges,
                  createEdgeFromNodes(enteredNode, node)
                ]);
              }
            }}
          />
        }
        dragNode={<Node />}
        dragEdge={null}
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onMouseEnter={() => setDroppable(true)}
        onMouseLeave={() => setDroppable(false)}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};
