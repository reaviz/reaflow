import calculateSize from 'calculate-size';
import { LayoutNodeData, NodeData } from '../types';
import ellipsize from 'ellipsize';

const MAX_CHAR_COUNT = 35;
const MIN_NODE_WIDTH = 50;
const DEFAULT_NODE_HEIGHT = 50;
const NODE_PADDING = 30;
const ICON_PADDING = 10;

export function measureText(text: string) {
  let result = { height: 0, width: 0 };

  if (text) {
    // Reference: https://github.com/reaviz/reaflow/pull/229
    // @ts-ignore
    const fn = typeof calculateSize === 'function' ? calculateSize : calculateSize.default;
    result = fn(text, {
      font: 'Arial, sans-serif',
      fontSize: '14px'
    });
  }

  return result;
}

export function parsePadding(padding: NodeData['nodePadding']) {
  let top = 50;
  let right = 50;
  let bottom = 50;
  let left = 50;

  if (Array.isArray(padding)) {
    if (padding.length === 2) {
      top = padding[0];
      bottom = padding[0];
      left = padding[1];
      right = padding[1];
    } else if (padding.length === 4) {
      top = padding[0];
      right = padding[1];
      bottom = padding[2];
      left = padding[3];
    }
  } else if (padding !== undefined) {
    top = padding;
    right = padding;
    bottom = padding;
    left = padding;
  }

  return {
    top,
    right,
    bottom,
    left
  };
}

export function formatText(node: NodeData) {
  const text = node.text ? ellipsize(node.text, MAX_CHAR_COUNT) : node.text;

  const labelDim = measureText(text);
  const nodePadding = parsePadding(node.nodePadding);

  let width = node.width;
  if (width === undefined) {
    if (text && node.icon) {
      width = labelDim.width + node.icon.width + NODE_PADDING + ICON_PADDING;
    } else {
      if (text) {
        width = labelDim.width + NODE_PADDING;
      } else if (node.icon) {
        width = node.icon.width + NODE_PADDING;
      }

      width = Math.max(width, MIN_NODE_WIDTH);
    }
  }

  let height = node.height;
  if (height === undefined) {
    if (text && node.icon) {
      height = labelDim.height + node.icon.height;
    } else if (text) {
      height = labelDim.height + NODE_PADDING;
    } else if (node.icon) {
      height = node.icon.height + NODE_PADDING;
    }

    height = Math.max(height, DEFAULT_NODE_HEIGHT);
  }

  return {
    text,
    originalText: node.text,
    width,
    height,
    nodePadding,
    labelHeight: labelDim.height,
    labelWidth: labelDim.width
  };
}

/**
 * Finds a node in a tree of nodes
 * @param nodes - The nodes to search through
 * @param nodeId - The id of the node to find
 * @returns The node if found, undefined otherwise
 */
export const findNode = (nodes: LayoutNodeData[], nodeId: string): any | undefined => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const foundNode = findNode(node.children, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return undefined;
};

/**
 * Finds the number of nested children a node has
 * @param node - The node to search through
 * @returns The number of children
 */
export const findChildCount = (node: LayoutNodeData): number => {
  return node.children.reduce((acc, child) => {
    if (child.children) {
      return acc + 1 + findChildCount(child);
    }
    return acc + 1;
  }, 0);
};
