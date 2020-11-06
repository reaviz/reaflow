import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { elkLayout, CanvasDirection } from './elkLayout';
import useDimensions from 'react-cool-dimensions';
import isEqual from 'react-fast-compare';

export interface ElkRoot {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: any[];
  edges?: any[];
  direction?: CanvasDirection;
}

export const useLayout = ({
  maxWidth,
  maxHeight,
  nodes = [],
  edges = [],
  direction,
  onLayoutChange
}) => {
  const scrolled = useRef<boolean>(false);
  const { ref, width, height } = useDimensions<HTMLDivElement>();
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  const [xy, setXY] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const promise = elkLayout(nodes, edges, { direction });

    promise
      .then((result) => {
        if (!isEqual(layout, result)) {
          setLayout(result);
          onLayoutChange(result);
        }
      })
      .catch(err => console.error('Layout Failed', err));

    return () => promise.cancel();
  }, [nodes, edges]);

  useLayoutEffect(() => {
    const scroller = ref.current;
    if (scroller && !scrolled.current && layout && height && width) {
      const scrollX = (maxWidth - height) / 2;
      const scrollY = (maxHeight - width) / 2;

      const x = maxWidth / 2 - layout.width / 2;
      const y = maxHeight / 2 - layout.height / 2;

      setXY([x, y]);
      scroller.scrollTo(scrollY, scrollX);
      scrolled.current = true;
    }
  }, [maxHeight, maxWidth, layout, height, width]);

  return {
    xy,
    ref,
    layout
  };
};
