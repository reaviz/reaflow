import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { elkLayout, CanvasDirection } from './elkLayout';
import useDimensions from 'react-cool-dimensions';
import isEqual from 'react-fast-compare';
import { EdgeData, NodeData } from '../types';

export interface ElkRoot {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: any[];
  edges?: any[];
  direction?: CanvasDirection;
}

export interface LayoutProps {
  maxHeight: number;
  maxWidth: number;
  nodes: NodeData[];
  edges: EdgeData[];
  pannable: boolean;
  center: boolean;
  direction: CanvasDirection;
  onLayoutChange: (layout: ElkRoot) => void;
}

export const useLayout = ({
  maxWidth,
  maxHeight,
  nodes = [],
  edges = [],
  pannable,
  center,
  direction,
  onLayoutChange
}: LayoutProps) => {
  const scrolled = useRef<boolean>(false);
  const { ref, width, height } = useDimensions<HTMLDivElement>();
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  const [xy, setXY] = useState<[number, number]>([0, 0]);
  const canvasHeight = pannable ? maxHeight : height;
  const canvasWidth = pannable ? maxWidth : width;

  useEffect(() => {
    const promise = elkLayout(nodes, edges, { direction });

    promise
      .then((result) => {
        if (!isEqual(layout, result)) {
          setLayout(result);
          onLayoutChange(result);
        }
      })
      .catch((err) => console.error('Layout Failed', err));

    return () => promise.cancel();
  }, [nodes, edges]);

  useLayoutEffect(() => {
    const scroller = ref.current;
    if (scroller && !scrolled.current && layout && height && width) {
      const scrollX = (canvasWidth - height) / 2;
      const scrollY = (canvasHeight - width) / 2;

      const x = canvasWidth / 2 - layout.width / 2;
      const y = canvasHeight / 2 - layout.height / 2;

      if (center) {
        setXY([x, y]);
      }

      if (!pannable) {
        scroller.scrollTo(scrollY, scrollX);
      }

      scrolled.current = true;
    }
  }, [canvasWidth, pannable, canvasHeight, layout, height, width, center]);

  return {
    xy,
    ref,
    canvasHeight,
    canvasWidth,
    containerWidth: width,
    containerHeight: height,
    layout
  };
};
