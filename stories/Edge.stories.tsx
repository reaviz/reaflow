import React, { useState} from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { removeAndUpsertNodes, upsertNode } from '../src/helpers';
import { EdgeData, NodeData } from '../src/types';

export default {
  title: 'Demos/Edges',
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

export const Adding = () => {
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        edge={props => (
          <Edge
            {...props}
            add={props => <Add {...props} hidden={false} />}
            onAdd={(event, edge) => {
              const id = `node-${Math.random()}`;
              const newNode = {
                id,
                text: id
              };

              const results = upsertNode(nodes, edges, edge, newNode);
              setNodes(results.nodes);
              setEdges(results.edges);
            }}
          />
        )}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const NotUpsertable = () => {
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        edge={props => (
          <Edge
            {...props}
            add={props => <Add {...props} hidden={false} />}
            upsertable={false}
            onAdd={(event, edge) => {
              const id = `node-${Math.random()}`;
              const newNode = {
                id,
                text: id
              };

              const results = upsertNode(nodes, edges, edge, newNode);
              setNodes(results.nodes);
              setEdges(results.edges);
            }}
          />
        )}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const NotSelectable = () => {
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
      <Canvas
        nodes={nodes}
        edges={edges}
        edge={props => (
          <Edge
            {...props}
            selectable={false}
          />
        )}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const Removeable = () => {
  const [selections, setSelections] = useState<string[]>(['1', '1-2']);
  const [nodes, setNodes] = useState<NodeData[]>([
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              setSelections([node.id]);
            }}
            onRemove={(event, node) => {
              console.log('Removing Node', event, node);
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              setSelections([]);
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([edge.id]);
            }}
            onRemove={(event, edge) => {
              console.log('Removing Edge', event, edge);
              setEdges(edges.filter(e => e.id !== edge.id));
              setSelections([]);
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

export const NotRemoveable = () => {
  const [selections, setSelections] = useState<string[]>(['1-2']);
  const [nodes, setNodes] = useState<NodeData[]>([
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

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={props => (
          <Node
            {...props}
            removable={false}
            onClick={(event, node) => {
              console.log('Selecting Node', event, node);
              setSelections([node.id]);
            }}
            onRemove={(event, node) => {
              console.log('Removing Node', event, node);
              const result = removeAndUpsertNodes(nodes, edges, node);
              setEdges(result.edges);
              setNodes(result.nodes);
              setSelections([]);
            }}
          />
        )}
        edge={props => (
          <Edge
            {...props}
            removable={false}
            onClick={(event, edge) => {
              console.log('Selecting Edge', event, edge);
              setSelections([edge.id]);
            }}
            onRemove={(event, edge) => {
              console.log('Removing Edge', event, edge);
              setEdges(edges.filter(e => e.id !== edge.id));
              setSelections([]);
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

export const Disabled = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      arrow={null}
      nodes={[
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
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2',
          selectionDisabled: true
        },
        {
          id: '2-3',
          from: '2',
          to: '3',
          disabled: true
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const NoArrows = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      arrow={null}
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
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

export const NoEdges = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
