import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { motion, useDragControls } from 'motion/react';
import { Portal } from 'reablocks';
import { EdgeData, NodeData } from '../src/types';
import { addNodeAndEdge } from '../src/helpers';

export default {
  title: 'Demos/Editor',
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
  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    }
  ]);

  const onDragStart =  (event, data) => {
    console.log('Start of Dragging', event, data);
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event) => {
    console.log('End of Dragging', event);

    if (droppable) {
      const id = `${activeDrag}-${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`;
      const result = addNodeAndEdge(
        nodes,
        edges,
        {
          id,
          text: id
        },
        enteredNode
      );
      setNodes(result.nodes);
      setEdges(result.edges);
    }

    setDroppable(false);
    setActiveDrag(null);
    setEnteredNode(null);
  };

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <style>
        {`
          .left {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 150px;
            background: #272626;
            color: white;
            padding: 20px;
            display: flex;
          }
          .right {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 150px;
            right: 0;
          }
          .block {
            height: 50px;
            width: 50px;
            cursor: grab;
            background: black;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            flex: 1;
          }
          .dragger {
            z-index: 999;
            pointer-events: none;
            user-select: none;
            cursor: grabbing;
            height: 70px;
            width: 150px;
          }
          .dragInner {
            pointer-events: none;
            margin-left: 80px;
            border-radius: 5px;
            background: black;
            border: solid 1px #00c5be;
            height: 40px;
            width: 40px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <div className="left">
        <motion.div className="block" onMouseDown={event => onDragStart(event, '1')}>
          Block 1
        </motion.div>
        <motion.div className="block" onMouseDown={event => onDragStart(event, '2')}>
          Block 2
        </motion.div>
      </div>
      <div className="right">
        <Canvas
          nodes={nodes}
          edges={edges}
          node={
            <Node
              onEnter={(event, node) => setEnteredNode(node)}
              onLeave={(event, node) => setEnteredNode(null)}
            />
          }
          onMouseEnter={() => setDroppable(true)}
          onMouseLeave={() => setDroppable(false)}
          onLayoutChange={layout => console.log('Layout', layout)}
        />
      </div>
      <Portal>
        <motion.div
          drag
          dragControls={dragControls}
          className="dragger"
          onDragEnd={onDragEnd}
        >
          {activeDrag && (
            <div className="dragInner">
              {activeDrag}
            </div>
          )}
        </motion.div>
      </Portal>
    </div>
  );
};
