import { EdgeData, NodeData } from '../types';
import ELK, { ElkNode } from 'elkjs/lib/elk.bundled';
import PCancelable from 'p-cancelable';
import { formatText, measureText } from './utils';

export type CanvasDirection = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP';

/**
 * ELKjs layout options for the Canvas.
 *
 * Unfortunately, the ELKjs documentation is not straightforward.
 * You'll likely need to take a look at the ELK options reference to see all available options.
 *
 * @see https://github.com/kieler/elkjs#layout-options
 * @see https://www.eclipse.org/elk/reference/options.html
 */
export interface ElkCanvasLayoutOptions {
  'elk.direction'?: CanvasDirection;
  [key: string]: string;
}

/**
 * ELKjs layout option for a node.
 *
 * TODO add reference link, I don't know what are the available options.
 *
 * @see https://www.eclipse.org/elk/reference/options.html
 */
export interface ElkNodeLayoutOptions {
  [key: string]: string;

  /**
   * @example [left=12, top=12, right=12, bottom=12]
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-padding.html
   */
  'elk.padding': string;

  /**
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-portConstraints.html
   */
  portConstraints:
    | 'UNDEFINED'
    | 'FREE'
    | 'FIXED_SIDE'
    | 'FIXED_ORDER'
    | 'FIXED_RATIO'
    | 'FIXED_POS';
}

/**
 * ELK layout options applied by default, unless overridden through <Canvas layoutOptions> property.
 *
 * XXX Not to be confounded with ELK "defaultLayoutOptions" property, which is meant to be used as fallback, when no layout option is provided.
 *
 * @see https://www.eclipse.org/elk/reference/options.html
 */
const defaultLayoutOptions: ElkCanvasLayoutOptions = {
  /**
   * Hints for where node labels are to be placed; if empty, the node label’s position is not modified.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-nodeLabels-placement.html
   */
  'elk.nodeLabels.placement': 'INSIDE V_CENTER H_RIGHT',

  /**
   * Select a specific layout algorithm.
   *
   * Uses "layered" strategy.
   * It emphasizes the direction of edges by pointing as many edges as possible into the same direction.
   * The nodes are arranged in layers, which are sometimes called “hierarchies”,
   * and then reordered such that the number of edge crossings is minimized.
   * Afterwards, concrete coordinates are computed for the nodes and edge bend points.
   *
   * @see https://www.eclipse.org/elk/reference/algorithms.html
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-algorithm.html
   * @see https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
   */
  'elk.algorithm': 'org.eclipse.elk.layered',

  /**
   * Overall direction of edges: horizontal (right / left) or vertical (down / up).
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-direction.html
   */
  'elk.direction': 'DOWN',

  /**
   * XXX NOT SURE - Option doesn't seem to exist, should be "org.eclipse.elk.layered.layering.strategy"?
   * Strategy for node layering.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-layering-strategy.html
   */
  nodeLayering: 'INTERACTIVE',

  /**
   * What kind of edge routing style should be applied for the content of a parent node.
   * Algorithms may also set this option to single edges in order to mark them as splines.
   * The bend point list of edges with this option set to SPLINES
   * must be interpreted as control points for a piecewise cubic spline.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-edgeRouting.html
   */
  'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',

  /**
   * Adds bend points even if an edge does not change direction.
   * If true, each long edge dummy will contribute a bend point to its edges
   * and hierarchy-crossing edges will always get a bend point where they cross hierarchy boundaries.
   * By default, bend points are only added where an edge changes direction.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-unnecessaryBendpoints.html
   */
  'elk.layered.unnecessaryBendpoints': 'true',

  /**
   * The spacing to be preserved between nodes and edges that are routed next to the node’s layer.
   * For the spacing between nodes and edges that cross the node’s layer ‘spacing.edgeNode’ is used.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-spacing-edgeNodeBetweenLayers.html
   */
  'elk.layered.spacing.edgeNodeBetweenLayers': '50',

  /**
   * Tells the BK node placer to use a certain alignment (out of its four)
   * instead of the one producing the smallest height, or the combination of all four.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-fixedAlignment.html
   */
  'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',

  /**
   * Strategy for cycle breaking.
   *
   * Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles.
   * Reversed edges will end up pointing to the opposite direction of regular edges
   * (that is, reversed edges will point left if edges usually point right).
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-cycleBreaking-strategy.html
   */
  'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',

  /**
   * Whether this node allows to route self loops inside of it instead of around it.
   *
   * If set to true, this will make the node a compound node if it isn’t already,
   * and will require the layout algorithm to support compound nodes with hierarchical ports.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-insideSelfLoops-activate.html
   */
  'org.eclipse.elk.insideSelfLoops.activate': 'true',

  /**
   * Whether each connected component should be processed separately.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-separateConnectedComponents.html
   */
  separateConnectedComponents: 'false',

  /**
   * Spacing to be preserved between pairs of connected components.
   * This option is only relevant if ‘separateConnectedComponents’ is activated.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-spacing-componentComponent.html
   */
  'spacing.componentComponent': '70',

  /**
   * XXX NOT SURE - Should be spacing.baseValue?
   * An optional base value for all other layout options of the ‘spacing’ group.
   * It can be used to conveniently alter the overall ‘spaciousness’ of the drawing.
   * Whenever an explicit value is set for the other layout options, this base value will have no effect.
   * The base value is not inherited, i.e. it must be set for each hierarchical node.
   *
   * @see https://www.eclipse.org/elk/reference/groups/org-eclipse-elk-layered-spacing.html
   */
  spacing: '75',

  /**
   * The spacing to be preserved between any pair of nodes of two adjacent layers.
   * Note that ‘spacing.nodeNode’ is used for the spacing between nodes within the layer itself.
   *
   * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-spacing-nodeNodeBetweenLayers.html
   */
  'spacing.nodeNodeBetweenLayers': '70'
};

function mapNode(nodes: NodeData[], edges: EdgeData[], node: NodeData) {
  const {
    text,
    width,
    height,
    labelHeight,
    labelWidth,
    nodePadding,
    originalText
  } = formatText(node);

  const children = nodes
    .filter((n) => n.parent === node.id)
    .map((n) => mapNode(nodes, edges, n));

  const childEdges = edges
    .filter((e) => e.parent === node.id)
    .map((e) => mapEdge(e));

  const nodeLayoutOptions: ElkNodeLayoutOptions = {
    'elk.padding': `[left=${nodePadding.left}, top=${nodePadding.top}, right=${nodePadding.right}, bottom=${nodePadding.bottom}]`,
    portConstraints: 'FIXED_ORDER',
    ...(node.layoutOptions || {})
  };

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
    layoutOptions: nodeLayoutOptions,
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
  options: ElkCanvasLayoutOptions
) => {
  const graph = new ELK();
  const layoutOptions: ElkCanvasLayoutOptions = {
    ...defaultLayoutOptions,
    ...options
  };

  return new PCancelable<ElkNode>((resolve, reject) => {
    graph
      .layout(
        {
          id: 'root',
          ...mapInput(nodes, edges)
        },
        {
          layoutOptions: layoutOptions
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
