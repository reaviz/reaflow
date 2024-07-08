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
export const getChildCount = (node: LayoutNodeData): number => {
  return (
    node.children?.reduce((acc, child) => {
      if (child.children) {
        return acc + 1 + getChildCount(child);
      }
      return acc + 1;
    }, 0) ?? 0
  );
};

/**
 * Calculates the zoom for a node when fitting it to the viewport
 * @param node - The node to calculate the zoom for
 * @param viewportWidth - The width of the viewport
 * @param viewportHeight - The height of the viewport
 * @param maxViewportCoverage - The maximum percentage of the viewport that the node will take up
 * @param minViewportCoverage - The minimum percentage of the viewport that the node will take up
 * @returns The zoom
 */
export const calculateZoom = ({ node, viewportWidth, viewportHeight, maxViewportCoverage = 0.9, minViewportCoverage = 0.2 }: { node: LayoutNodeData; viewportWidth: number; viewportHeight: number; maxViewportCoverage?: number; minViewportCoverage?: number }) => {
  const childCount = getChildCount(node);

  // viewport coverage is the percentage of the viewport that the node will take up
  // nodes with more children look better when they take up more of the viewport
  const viewportCoverage = Math.min(maxViewportCoverage, Math.max(minViewportCoverage, minViewportCoverage + childCount * 0.1));

  const updatedHorizontalZoom = (viewportCoverage * viewportWidth) / node.width;
  const updatedVerticalZoom = (viewportCoverage * viewportHeight) / node.height;
  const updatedZoom = Math.min(updatedHorizontalZoom, updatedVerticalZoom);

  return updatedZoom - 1;
};

/**
 * Calculates the scroll position for the canvas when fitting a node to the viewport - assumes the chart is centered
 * @param node - The node to calculate the zoom and position for
 * @param viewportWidth - The width of the viewport
 * @param viewportHeight - The height of the viewport
 * @param canvasWidth - The width of the canvas
 * @param canvasHeight - The height of the canvas
 * @param chartWidth - The width of the chart
 * @param chartHeight - The height of the chart
 * @param zoom - The zoom level of the canvas
 * @returns The scroll position
 */
export const calculateScrollPosition = ({ node, viewportWidth, viewportHeight, canvasWidth, canvasHeight, chartWidth, chartHeight, zoom }: { node: LayoutNodeData; viewportWidth: number; viewportHeight: number; canvasWidth: number; canvasHeight: number; chartWidth: number; chartHeight: number; zoom: number }): [number, number] => {
  // get updated node dimensions because they change based on the zoom level
  const updatedNodeWidth = node.width * zoom;
  const updatedNodeHeight = node.height * zoom;

  // the chart is centered so we can assume the x and y positions
  const chartPosition = {
    x: (canvasWidth - chartWidth * zoom) / 2,
    y: (canvasHeight - chartHeight * zoom) / 2
  };

  const nodeCenterXPosition = chartPosition.x + node.x * zoom + updatedNodeWidth / 2;
  const nodeCenterYPosition = chartPosition.y + node.y * zoom + updatedNodeHeight / 2;

  // scroll to the spot that centers the node in the viewport
  const scrollX = nodeCenterXPosition - viewportWidth / 2;
  const scrollY = nodeCenterYPosition - viewportHeight / 2;

  return [scrollX, scrollY];
};
