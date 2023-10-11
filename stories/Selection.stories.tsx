import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { useSelection, removeAndUpsertNodes } from '../src/helpers';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';

export default {
  title: 'Demos/Selections',
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
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
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
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onRemove={(event, node) => {
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              clearSelections();
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              onClick(event, edge);
            }}
          />
        )}
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const Nested = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '3',
      text: 'Node 2',
      parent: '1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
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
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onRemove={(event, node) => {
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              clearSelections();
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              onClick(event, edge);
            }}
          />
        )}
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const Defaults = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
    nodes,
    edges,
    selections: ['1'],
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
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              onClick(event, node);
            }}
            onKeyDown={(event, node) => {
              console.log('Keydown Event', node, event);
              onKeyDown(event);
            }}
            onRemove={(event, node) => {
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              clearSelections();
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              onClick(event, edge);
            }}
          />
        )}
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          onCanvasClick();
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const ManualSelection = () => {
  const [selections, setSelections] = useState<string[]>([]);
  const [nodes] = useState<NodeData[]>([
    {
      id: '1',
      text: 'Node 1'
    },
    {
      id: '2',
      text: 'Node 2'
    }
  ]);

  const [edges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <pre style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        <h3 style={{ padding: 0, margin: 0 }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              setSelections([...selections, node.id]);
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([...selections, edge.id]);
            }}
          />
        )}
        onCanvasClick={(event) => {
          console.log('Canvas Clicked', event);
          setSelections([]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};
