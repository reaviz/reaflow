import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { elkLayout } from './elkLayout';
import { ElkNode } from 'elkjs/lib/elk.bundled';

export const useLayout = ({ nodes, edges, maxWidth, maxHeight }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<ElkNode | null>(null);

  useEffect(() => {
    const promise = elkLayout(nodes, edges);

    promise
      .then((result) => {
        console.log('layout', result);
        setLayout(result);
      })
      .catch(() => undefined);

    return () => promise.cancel();
  }, [nodes, edges]);

  // TODO: Subtract node/edge dims from this
  const x = maxWidth / 2;
  const y = maxHeight / 2;

  useLayoutEffect(() => {
    const scroller = containerRef.current;
    if (scroller && layout) {
      scroller.scrollTo(
        (maxHeight - layout.height) / 2,
        (maxWidth - layout.width) / 2
      );
    }
  }, [maxHeight, maxWidth, layout, containerRef]);

  return {
    x,
    y,
    ref: containerRef,
    layout,
  };
};
