import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
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
  fit: boolean;
  zoom: number;
  layoutOptions?: any;
  direction: CanvasDirection;
  setZoom: (factor: number) => void;
  onLayoutChange: (layout: ElkRoot) => void;
}

export const useLayout = ({
  maxWidth,
  maxHeight,
  nodes = [],
  edges = [],
  fit,
  pannable,
  center,
  direction,
  layoutOptions = {},
  zoom,
  setZoom,
  onLayoutChange
}: LayoutProps) => {
  const scrolled = useRef<boolean>(false);
  const { ref, width, height } = useDimensions<HTMLDivElement>();
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  const [xy, setXY] = useState<[number, number]>([0, 0]);
  const [scrollXY, setScrollXY] = useState<[number, number]>([0, 0]);
  const canvasHeight = pannable ? maxHeight : height;
  const canvasWidth = pannable ? maxWidth : width;

  useEffect(() => {
    const promise = elkLayout(nodes, edges, { direction, ...layoutOptions });

    promise
      .then((result) => {
        if (!isEqual(layout, result)) {
          setLayout(result);
          onLayoutChange(result);
        }
      })
      .catch((err) => {
        if (err.name !== 'CancelError') {
          console.error('Layout Error:', err);
        }
      });

    return () => promise.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  const centerVector = useCallback(() => {
    if (center) {
      // @ts-ignore
      const x = (canvasWidth - layout.width * zoom) / 2;
      // @ts-ignore
      const y = (canvasHeight - layout.height * zoom) / 2;

      setXY([x, y]);
    }
  }, [canvasWidth, canvasHeight, layout, zoom, center]);

  const centerScroll = useCallback(() => {
    const scrollX = (canvasWidth - width) / 2;
    const scrollY = (canvasHeight - height) / 2;
    if (pannable) {
      setScrollXY([scrollX, scrollY]);
    }
  }, [canvasWidth, canvasHeight, width, height, pannable]);

  const centerCanvas = useCallback(() => {
    centerVector();
    centerScroll();
  }, [centerScroll, centerVector]);

  useEffect(() => {
    ref?.current?.scrollTo(scrollXY[0], scrollXY[1]);
  }, [scrollXY, ref]);

  useEffect(() => {
    if (scrolled.current) {
      centerVector();
    }
  }, [centerVector, zoom]);

  const fitCanvas = useCallback(() => {
    if (layout) {
      const heightZoom = height / layout.height;
      const widthZoom = width / layout.width;
      const scale = Math.min(heightZoom, widthZoom, 1);
      setZoom(scale - 1);
      centerCanvas();
    }
  }, [height, layout, width, setZoom, centerCanvas]);

  useLayoutEffect(() => {
    const scroller = ref.current;
    if (scroller && !scrolled.current && layout && height && width) {
      if (fit) {
        fitCanvas();
      } else {
        centerCanvas();
      }

      scrolled.current = true;
    }
  }, [
    canvasWidth,
    pannable,
    canvasHeight,
    layout,
    height,
    fit,
    width,
    center,
    centerCanvas,
    fitCanvas,
    ref
  ]);

  useLayoutEffect(() => {
    function onResize() {
      if (fit) {
        fitCanvas();
      } else {
        centerCanvas();
      }
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [fit, centerCanvas, fitCanvas]);

  return {
    xy,
    containerRef: ref,
    canvasHeight,
    canvasWidth,
    containerWidth: width,
    containerHeight: height,
    layout,
    scrollXY,
    centerCanvas,
    fitCanvas
  };
};
