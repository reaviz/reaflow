import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import isEqual from 'react-fast-compare';
import { CanvasPosition, EdgeData, NodeData } from '../types';
import { CanvasDirection, ElkCanvasLayoutOptions, elkLayout } from './elkLayout';
import { calculateScrollPosition, calculateZoom, findNode } from './utils';

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
  defaultPosition: CanvasPosition;
  fit: boolean;
  zoom: number;
  layoutOptions?: ElkCanvasLayoutOptions;
  direction: CanvasDirection;
  setZoom: (factor: number) => void;
  onLayoutChange: (layout: ElkRoot) => void;
}

export interface LayoutResult {
  /**
   * X/Y offset.
   */
  xy: [number, number];

  /**
   * Scroll offset.
   */
  scrollXY: [number, number];

  /**
   * ELK Layout object.
   */
  layout: ElkRoot;

  /**
   * Ref to container div.
   */
  containerRef: RefObject<HTMLDivElement | null>;

  /**
   * Height of the svg.
   */
  canvasHeight?: number;

  /**
   * Width of the svg.
   */
  canvasWidth?: number;

  /**
   * Width of the container div.
   */
  containerWidth?: number;

  /**
   * Height of the container div.
   */
  containerHeight?: number;

  /**
   * Positions the canvas to the viewport.
   */
  positionCanvas?: (position: CanvasPosition, animated?: boolean) => void;

  /**
   * Fit the canvas to the viewport.
   */
  fitCanvas?: (animated?: boolean) => void;

  /**
   * Fit a node to the viewport.
   */
  fitToNode?: (nodeId: string, animated?: boolean) => void;

  /**
   * Scroll to X/Y
   */
  setScrollXY?: (xy: [number, number], animated?: boolean) => void;

  observe: (el: HTMLDivElement) => void;
}

export const useLayout = ({ maxWidth, maxHeight, nodes = [], edges = [], fit, pannable, defaultPosition, direction, layoutOptions = {}, zoom, setZoom, onLayoutChange }: LayoutProps) => {
  const scrolled = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const [layout, setLayout] = useState<ElkRoot | null>(null);
  const [xy, setXY] = useState<[number, number]>([0, 0]);
  const [scrollXY, setScrollXY] = useState<[number, number]>([0, 0]);
  const canvasHeight = pannable ? maxHeight : height;
  const canvasWidth = pannable ? maxWidth : width;

  const scrollToXY = (xy: [number, number], animated = false) => {
    ref.current.scrollTo({ left: xy[0], top: xy[1], behavior: animated ? 'smooth' : 'auto' });
    setScrollXY(xy);
  };

  useEffect(() => {
    const promise = elkLayout(nodes, edges, {
      'elk.direction': direction,
      ...layoutOptions
    });

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

  const positionVector = useCallback(
    (position: CanvasPosition) => {
      if (layout) {
        const centerX = (canvasWidth - layout.width * zoom) / 2;
        const centerY = (canvasHeight - layout.height * zoom) / 2;
        switch (position) {
        case CanvasPosition.CENTER:
          setXY([centerX, centerY]);
          break;
        case CanvasPosition.TOP:
          setXY([centerX, 0]);
          break;
        case CanvasPosition.LEFT:
          setXY([0, centerY]);
          break;
        case CanvasPosition.RIGHT:
          setXY([canvasWidth - layout.width * zoom, centerY]);
          break;
        case CanvasPosition.BOTTOM:
          setXY([centerX, canvasHeight - layout.height * zoom]);
          break;
        }
      }
    },
    [canvasWidth, canvasHeight, layout, zoom]
  );

  const positionScroll = useCallback(
    (position: CanvasPosition, animated = false) => {
      const scrollCenterX = (canvasWidth - width) / 2;
      const scrollCenterY = (canvasHeight - height) / 2;
      if (pannable) {
        switch (position) {
        case CanvasPosition.CENTER:
          scrollToXY([scrollCenterX, scrollCenterY], animated);
          break;
        case CanvasPosition.TOP:
          scrollToXY([scrollCenterX, 0], animated);
          break;
        case CanvasPosition.LEFT:
          scrollToXY([0, scrollCenterY], animated);
          break;
        case CanvasPosition.RIGHT:
          scrollToXY([canvasWidth - width, scrollCenterY], animated);
          break;
        case CanvasPosition.BOTTOM:
          scrollToXY([scrollCenterX, canvasHeight - height], animated);
          break;
        }
      }
    },
    [canvasWidth, canvasHeight, width, height, pannable]
  );

  const positionCanvas = useCallback(
    (position: CanvasPosition, animated = false) => {
      positionVector(position);
      positionScroll(position, animated);
    },
    [positionScroll, positionVector]
  );

  useEffect(() => {
    if (scrolled.current && defaultPosition) {
      positionVector(defaultPosition);
    }
  }, [positionVector, zoom, defaultPosition]);

  const fitCanvas = useCallback(
    (animated = false) => {
      if (layout) {
        const heightZoom = height / layout.height;
        const widthZoom = width / layout.width;
        const scale = Math.min(heightZoom, widthZoom, 1);
        setZoom(scale - 1);
        positionCanvas(CanvasPosition.CENTER, animated);
      }
    },
    [height, layout, width, setZoom, positionCanvas]
  );

  /**
   * This centers the chart on the canvas, zooms in to fit the specified node, and scrolls to center the node in the viewport
   */
  const fitToNode = useCallback(
    (nodeId: string, animated = true) => {
      if (layout && layout.children) {
        const node = findNode(layout.children, nodeId);

        if (node) {
          // center the chart
          positionVector(CanvasPosition.CENTER);

          const updatedZoom = calculateZoom({ node, viewportWidth: width, viewportHeight: height, maxViewportCoverage: 0.9, minViewportCoverage: 0.2 });
          const scrollPosition = calculateScrollPosition({ node, viewportWidth: width, viewportHeight: height, canvasWidth, canvasHeight, chartWidth: layout.width, chartHeight: layout.height, zoom: updatedZoom });

          setZoom(updatedZoom);
          scrollToXY(scrollPosition, animated);
        }
      }
    },
    [canvasHeight, canvasWidth, height, layout, positionVector, setZoom, width]
  );

  useLayoutEffect(() => {
    const scroller = ref.current;
    if (scroller && !scrolled.current && layout && height && width) {
      if (fit) {
        fitCanvas();
      } else if (defaultPosition) {
        positionCanvas(defaultPosition);
      }

      scrolled.current = true;
    }
  }, [canvasWidth, pannable, canvasHeight, layout, height, fit, width, defaultPosition, positionCanvas, fitCanvas, ref]);

  useLayoutEffect(() => {
    function onResize() {
      if (fit) {
        fitCanvas();
      } else if (defaultPosition) {
        positionCanvas(defaultPosition);
      }
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [fit, positionCanvas, defaultPosition, fitCanvas]);

  return {
    xy,
    observe,
    containerRef: ref,
    canvasHeight,
    canvasWidth,
    containerWidth: width,
    containerHeight: height,
    layout,
    scrollXY,
    positionCanvas,
    fitCanvas,
    fitToNode,
    setScrollXY: scrollToXY
  } as LayoutResult;
};
