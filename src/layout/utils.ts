import calculateSize from 'calculate-size';
import { NodeData } from '../types';
import ellipsize from 'ellipsize';

const MAX_CHAR_COUNT = 35;
const MIN_NODE_WIDTH = 50;
const DEFAULT_NODE_HEIGHT = 50;
const NODE_PADDING = 20;
const ICON_PADDING = 10;

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

export function formatText(node: NodeData) {
  const text = node.text
    ? ellipsize(node.text, MAX_CHAR_COUNT)
    : node.text;

  const labelDim = measureText(text);

  let width = node.width;
  if (width === undefined) {
    if (text && node.icon) {
      width = labelDim.width + node.icon.width + NODE_PADDING + ICON_PADDING;
    } else if (text) {
      width = Math.max(labelDim.width + NODE_PADDING, MIN_NODE_WIDTH);
    } else if (node.icon) {
      width = Math.max(node.icon.width + NODE_PADDING, MIN_NODE_WIDTH);
    }
  }

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
