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

export const useLayout = ({
  maxWidth,
  maxHeight,
  nodes,
  edges = [],
  onLayoutChange
}) => {
  const scrolled = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  // const [x, setX] = useState<number>(0);
  // const [y, setY] = useState<number>(0);

  useEffect(() => {
    const promise = elkLayout(nodes, edges);

    promise
      .then((result) => {
        setLayout(result);
        onLayoutChange(result);
      })
      .catch(() => undefined);

    return () => promise.cancel();
  }, [nodes, edges]);

  useLayoutEffect(() => {
    const scroller = containerRef.current;
    if (scroller && !scrolled.current && layout) {
      // const newX = (maxHeight - layout.height) / 2;
      // const newY = (maxWidth - layout.width) / 2;

      const newX = maxHeight / 2;
      const newY = maxWidth / 2;

      // setX(newX);
      // setY(newY);
      scroller.scrollTo(newY, newX);

      scrolled.current = true;
    }
  }, [maxHeight, maxWidth, layout, containerRef]);

  return {
    // x,
    // y,
    ref: containerRef,
    layout
  };
};
