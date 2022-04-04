import React, { useRef, useState } from 'react';
import { Canvas, CanvasRef } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { motion, useDragControls } from 'framer-motion/dist/framer-motion';
import { Portal } from 'rdk';
import { EdgeData, NodeData } from '../src/types';
import { addNodeAndEdge, useProximity } from '../src/helpers';
import classNames from 'classnames';

export default {
  title: 'Demos/Proximity',
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

  const canvasRef = useRef<CanvasRef | null>(null);

  const {
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    canvasRef,
    onIntersects: (match: string) => {
      console.info('Node Intersected', match);
    },
    onDistanceChange: (distance: number | null) => {
      console.info('Distance Changed', distance);
    },
    onMatchChange: (match: string | null) => {
      console.info('Match Changed!', match);

      let matchNode: NodeData | null = null;
      if (match) {
        matchNode = nodes.find(n => n.id === match);
      }

      setEnteredNode(matchNode);
      setDroppable(matchNode !== null);
    }
  });

  const onDragStart =  (event, data) => {
    console.info('Start of Dragging', event, data);
    onProximityDragStart(event);
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDrag = (event) => {
    onProximityDrag(event);
  };

  const onDragEnd = (event) => {
    onProximityDragEnd(event);

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
          .closest {
            stroke: yellow !important;
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
          ref={canvasRef}
          nodes={nodes}
          edges={edges}
          node={
            (n => (
              <Node
                {...n}
                style={{
                  strokeWidth: enteredNode?.id === n.id && droppable ? 5 : 1
                }}
                className={classNames({ closest: enteredNode?.id === n.id })}
                onEnter={(event, node) => setEnteredNode(node)}
                onLeave={(event, node) => setEnteredNode(null)}
              />
            ))
          }
          onLayoutChange={layout => console.info('Layout', layout)}
        />
      </div>
      <Portal>
        <motion.div
          drag
          dragControls={dragControls}
          className="dragger"
          onDrag={onDrag}
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


export const Nested = () => {
  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);

  const [nodes, setNodes] = useState<NodeData[]>([
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
    }
  ]);

  const canvasRef = useRef<CanvasRef | null>(null);

  const {
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    canvasRef,
    onDistanceChange: (distance: number | null) => {
      console.info('Distance Changed', distance);
    },
    onIntersects: (match: string) => {
      console.info('Node Intersected', match);
    },
    onMatchChange: (match: string | null) => {
      console.info('Match Changed!', match);

      let matchNode: NodeData | null = null;
      if (match) {
        matchNode = nodes.find(n => n.id === match);
      }

      setEnteredNode(matchNode);
      setDroppable(matchNode !== null);
    }
  });

  const onDragStart =  (event, data) => {
    console.info('Start of Dragging', event, data);
    onProximityDragStart(event);
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDrag = (event) => {
    onProximityDrag(event);
  };

  const onDragEnd = (event) => {
    onProximityDragEnd(event);

    if (droppable) {
      const id = `${activeDrag}-${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`;

      // This is for demonstration purposes, you should
      // tweak this to fit your business infoic
      if (enteredNode?.id === '2') {
        setNodes([
          ...nodes,
          {
            id,
            text: id,
            parent: '2'
          }
        ]);
      } else {
        const result = addNodeAndEdge(
          nodes,
          edges,
          {
            id,
            text: id,
            parent: enteredNode?.parent
          },
          enteredNode
        );
        setNodes(result.nodes);
        setEdges(result.edges);
      }
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
          .closest {
            stroke: yellow !important;
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
          ref={canvasRef}
          nodes={nodes}
          edges={edges}
          node={
            (n => (
              <Node
                {...n}
                style={{
                  strokeWidth: enteredNode?.id === n.id && droppable ? 5 : 1
                }}
                className={classNames({ closest: enteredNode?.id === n.id })}
              />
            ))
          }
          onLayoutChange={layout => console.info('Layout', layout)}
        />
      </div>
      <Portal>
        <motion.div
          drag
          dragControls={dragControls}
          className="dragger"
          onDrag={onDrag}
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
