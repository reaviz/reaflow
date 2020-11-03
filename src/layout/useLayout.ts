import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { elkLayout } from './elkLayout';

export interface ElkRoot {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: any[];
  edges?: any[];
}

export const useLayout = ({ nodes, edges, maxWidth, maxHeight }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const promise = elkLayout(nodes, edges);

    promise
      .then((result) => {
        console.log('Layout', result);
        setLayout(result);
      })
      .catch(() => undefined);

    return () => promise.cancel();
  }, [nodes, edges]);

  useLayoutEffect(() => {
    const scroller = containerRef.current;
    if (scroller && layout) {
      const newX = (maxHeight - layout.height) / 2;
      const newY = (maxWidth - layout.width) / 2;
      scroller.scrollTo(newY, newX);
    }
  }, [maxHeight, maxWidth, layout, containerRef]);

  useEffect(() => {
    if (layout) {
      const newX = (maxHeight - layout.height) / 2;
      const newY = (maxWidth - layout.width) / 2;
      setX(newX);
      setY(newY);
    }
  }, [maxHeight, maxWidth, layout]);

  return {
    x,
    y,
    ref: containerRef,
    layout
  };
};
