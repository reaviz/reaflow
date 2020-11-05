import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { elkLayout } from './elkLayout';
import useDimensions from 'react-cool-dimensions';
import isEqual from 'react-fast-compare';

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
  const { ref, width, height } = useDimensions<HTMLDivElement>();
  const [layout, setLayout] = useState<ElkRoot | null>(null);

  useEffect(() => {
    const promise = elkLayout(nodes, edges);

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
      const newX = (maxHeight - width + layout.height) / 2;
      const newY = (maxWidth - height + layout. width) / 2;

      scroller.scrollTo(newY, newX);
      scrolled.current = true;
    }
  }, [maxHeight, maxWidth, layout, height, width]);

  return {
    ref,
    layout
  };
};
