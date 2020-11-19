import { EdgeData, NodeData } from '../types';
import ELK, { ElkNode } from 'elkjs/lib/elk.bundled';
import PCancelable from 'p-cancelable';
import { formatText, measureText } from './utils';

export type CanvasDirection = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP';

export interface ElkOptions {
  direction: CanvasDirection;
}

const defaultLayoutOptions = {
  'elk.nodeLabels.placement': 'INSIDE V_CENTER H_RIGHT',
  'elk.algorithm': 'org.eclipse.elk.layered',
  'elk.direction': 'DOWN',
  nodeLayering: 'INTERACTIVE',
  'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',
  'elk.layered.unnecessaryBendpoints': 'true',
  'elk.layered.spacing.edgeNodeBetweenLayers': '50',
  'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
  'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',
  'org.eclipse.elk.insideSelfLoops.activate': 'true',
  separateConnectedComponents: 'false',
  'spacing.componentComponent': '70',
  spacing: '75',
  'spacing.nodeNodeBetweenLayers': '70'
};

function mapNode(nodes: NodeData[], edges: EdgeData[], node: NodeData) {
  const { text, width, height, labelHeight, labelWidth, originalText } = formatText(node);

  const children = nodes
    .filter((n) => n.parent === node.id)
    .map((n) => mapNode(nodes, edges, n));

  const childEdges = edges
    .filter((e) => e.parent === node.id)
    .map((e) => mapEdge(e));

  return {
    id: node.id,
    height,
    width,
    children,
    edges: childEdges,
    ports: node.ports
      ? node.ports.map((port) => ({
        id: port.id,
        properties: {
          ...port,
          'port.side': port.side,
          'port.alignment': port.alignment || 'CENTER'
        }
      }))
      : [],
    layoutOptions: {
      'elk.padding': '[left=50, top=50, right=50, bottom=50]',
      portConstraints: 'FIXED_ORDER'
    },
    properties: {
      ...node
    },
    labels: text
      ? [
        {
          width: labelWidth,
          height: -(labelHeight / 2),
          text,
          originalText
          // layoutOptions: { 'elk.nodeLabels.placement': 'INSIDE V_CENTER H_CENTER' }
        }
      ]
      : []
  };
}

function mapEdge(edge: EdgeData) {
  const labelDim = measureText(edge.text);

  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    properties: {
      ...edge
    },
    sourcePort: edge.fromPort,
    targetPort: edge.toPort,
    labels: edge.text
      ? [
        {
          width: labelDim.width / 2,
          height: -(labelDim.height / 2),
          text: edge.text,
          layoutOptions: {
            'elk.edgeLabels.placement': 'INSIDE V_CENTER H_CENTER'
          }
        }
      ]
      : []
  };
}

function mapInput(nodes: NodeData[], edges: EdgeData[]) {
  const children = [];
  const mappedEdges = [];

  for (const node of nodes) {
    if (!node.parent) {
      const mappedNode = mapNode(nodes, edges, node);
      if (mappedNode !== null) {
        children.push(mappedNode);
      }
    }
  }

  for (const edge of edges) {
    if (!edge.parent) {
      const mappedEdge = mapEdge(edge);
      if (mappedEdge !== null) {
        mappedEdges.push(mappedEdge);
      }
    }
  }

  return {
    children,
    edges: mappedEdges
  };
}

function postProcessNode(nodes: any[]): any[] {
  for (const node of nodes) {
    const hasLabels = node.labels?.length > 0;

    if (hasLabels && node.properties.icon) {
      const [label] = node.labels;
      label.x = node.properties.icon.width + 25;
      node.properties.icon.x = 25;
      node.properties.icon.y = node.height / 2;
    } else if (hasLabels) {
      const [label] = node.labels;
      label.x = (node.width - label.width) / 2;
    } else if (node.properties.icon) {
      node.properties.icon.x = node.width / 2;
      node.properties.icon.y = node.height / 2;
    }

    if (node.children) {
      postProcessNode(node.children);
    }
  }

  return nodes;
}

export const elkLayout = (
  nodes: NodeData[],
  edges: EdgeData[],
  options: ElkOptions
) => {
  const graph = new ELK();

  return new PCancelable<ElkNode>((resolve, reject) => {
    graph
      .layout(
        {
          id: 'root',
          ...mapInput(nodes, edges)
        },
        {
          layoutOptions: {
            ...defaultLayoutOptions,
            'elk.direction': options.direction
          }
        }
      )
      .then((data) => {
        resolve({
          ...data,
          children: postProcessNode(data.children)
        });
      })
      .catch(reject);
  });
};
