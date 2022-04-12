import { ElkNodeLayoutOptions } from './layout';

export enum CanvasPosition {
  CENTER = 'center',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom'
}

export enum CanvasElement {
  NODES = 'nodes',
  EDGES = 'edges',
  PORTS = 'ports',
  DRAG_EDGE = 'dragEdge',
  DRAG_NODE = 'dragNode'
}

export interface NodeData<T = any> {
  /**
   * Unique ID for the node.
   */
  id: string;

  /**
   * Whether the node is disabled or not.
   */
  disabled?: boolean;

  /**
   * Text label for the node.
   */
  text?: any;

  /**
   * Optional height attribute. If not passed with calculate
   * default sizes using text.
   */
  height?: number;

  /**
   * Optional width attribute. If not passed with calculate
   * default sizes using text.
   */
  width?: number;

  /**
   * Parent node id for nesting.
   */
  parent?: string;

  /**
   * List of ports.
   */
  ports?: PortData[];

  /**
   * Icon for the node.
   */
  icon?: IconData;

  /**
   * Padding for the node.
   */
  nodePadding?: number | [number, number] | [number, number, number, number];

  /**
   * Data for the node.
   */
  data?: T;

  /**
   * CSS classname for the node.
   */
  className?: string;

  /**
   * ELK layout options.
   */
  layoutOptions?: ElkNodeLayoutOptions;

  /**
   * Whether the node can be clicked.
   */
  selectionDisabled?: boolean;
}

export interface LayoutNodeData extends NodeData {
  x: number;
  y: number;
  children?: LayoutNodeData[];
}

export interface IconData {
  /**
   * URL for the icon.
   */
  url: string;

  /**
   * Height of the icon.
   */
  height: number;

  /**
   * Width of the icon.
   */
  width: number;
}

export interface EdgeData<T = any> {
  /**
   * Unique ID of the edge.
   */
  id: string;

  /**
   * Whether the edge is disabled or not.
   */
  disabled?: boolean;

  /**
   * Text label for the edge.
   */
  text?: any;

  /**
   * ID of the from node.
   */
  from?: string;

  /**
   * ID of the to node.
   */
  to?: string;

  /**
   * Optional ID of the from port.
   */
  fromPort?: string;

  /**
   * Optional ID of the to port.
   */
  toPort?: string;

  /**
   * Data about the edge.
   */
  data?: T;

  /**
   * CSS class name for the edge ("path" element).
   */
  className?: string;

  /**
   * CSS class name for the edge (main "g" element).
   */
  containerClassName?: string;

  /**
   * Optional arrow head type.
   */
  arrowHeadType?: any;

  /**
   * Parent of the edge for nesting.
   */
  parent?: string;

  /**
   * Whether the edge can be clicked.
   */
  selectionDisabled?: boolean;
}

export type PortSide = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export interface PortData {
  /**
   * Unique ID of the port.
   */
  id: string;

  /**
   * Port is disabled.
   */
  disabled?: boolean;

  /**
   * Height of the port.
   */
  height: number;

  /**
   * Width of the port.
   */
  width: number;

  /**
   * Whether the port is visually hidden or not.
   */
  hidden?: boolean;

  /**
   * Classname for the port.
   */
  className?: string;

  /**
   * Alignment of the port.
   */
  alignment?: 'CENTER';

  /**
   * Side the port is located.
   */
  side: PortSide;
}
