import calculateSize from 'calculate-size';
import { NodeData } from '../types';
import ellipsize from 'ellipsize';

const MAX_CHAR_COUNT = 35;
const DEFAULT_NODE_WIDTH = 150;
const DEFAULT_NODE_HEIGHT = 50;
const MAX_NODE_WIDTH = 250;
const NODE_PADDING = 10;

export function measureText(text: string) {
  let result = { height: 0, width: 0 };

  if (text) {
    result = calculateSize(text, {
      font: 'Arial, sans-serif',
      fontSize: '14px'
    });
  }

  return result;
}

export function getMaxWidth(
  node: NodeData,
  labelDim: { width: number; height: number; },
  defaultWidth = DEFAULT_NODE_WIDTH,
  maxWidth = MAX_NODE_WIDTH,
  padding = NODE_PADDING
) {
  let width = node.width;

  if (width === undefined) {
    width = defaultWidth;
  }

  if (labelDim.width) {
    width = Math.max(labelDim.width, width);
  }

  width = Math.min(width, maxWidth);

  return width + padding;
}

export function formatText(node: NodeData) {
  const text = node.text
    ? ellipsize(node.text, MAX_CHAR_COUNT)
    : node.text;

  const labelDim = measureText(text);
  const width = getMaxWidth(node, labelDim);
  const height = node.height || DEFAULT_NODE_HEIGHT;

  return {
    text,
    originalText: node.text,
    width,
    height,
    labelHeight: labelDim.height,
    labelWidth: labelDim.width
  };
}
