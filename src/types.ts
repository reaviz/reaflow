export interface NodeData<T = any> {
  id: string;
  disabled?: boolean;
  text?: any;
  height?: number;
  width?: number;
  parent?: string;
  ports?: PortData[];
  icon?: IconData;
  nodePadding?: [number, number] | [number, number, number, number] | number;
  data?: T;
  className?: string;
}

export interface IconData {
  url: string;
  height: number;
  width: number;
}

export interface EdgeData<T = any> {
  id: string;
  disabled?: boolean;
  text?: any;
  from?: string;
  to?: string;
  fromPort?: string;
  toPort?: string;
  data?: T;
  className?: string;
  arrowHeadType?: any;
  parent?: string;
}

export interface PortData {
  id: string;
  height: number;
  width: number;
  hidden?: boolean;
  className?: string;
  alignment?: 'CENTER';
  side: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
}
