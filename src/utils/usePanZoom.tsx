import panzoom, { PanZoom } from 'panzoom';
import { useEffect, useRef, useState } from 'react';

export interface PanZoomProps {
  maxZoom?: number;
  minZoom?: number;
}

export const usePanZoom = (props?: PanZoomProps) => {
  const elmRef = useRef<any | null>(null);

  // Some good ideas in these:
  // - https://github.com/graphql-editor/graphql-editor/blob/master/src/Graf/Graf.tsx#L77
  // - https://github.com/aoshea/react-svg-viewer/blob/master/src/index.tsx
  // - https://www.npmjs.com/package/use-pan-zoom
  const [instance, setInstance] = useState<PanZoom | null>(null);

  useEffect(() => {
    if (elmRef.current) {
      const cur = panzoom(elmRef.current, {
        maxZoom: props?.maxZoom || 5,
        minZoom: props?.minZoom || 1,
        enableTextSelection: false,
        zoomDoubleClickSpeed: 1,
        bounds: true,
        boundsPadding: 0.1,
        beforeMouseDown: (e: any) => {
          if (e.target.tagName === 'rect') {
            return true;
          }
          return false;
        },
      });

      setInstance(cur);
    }

    return () => {
      instance?.dispose();
    };
  }, [elmRef]);

  return [elmRef, instance] as any[];
};
