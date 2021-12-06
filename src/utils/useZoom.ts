import { RefObject, useCallback, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';

const limit = (scale: number, min: number, max: number) =>
  scale < max ? (scale > min ? scale : min) : max;

export interface ZoomProps {
  disabled?: boolean;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomChange: (zoom: number) => void;
}

export interface ZoomResult {
  /**
   * Factor of zoom.
   */
  zoom: number;

  /**
   * SVG Ref for the Canvas.
   */
  svgRef: RefObject<SVGSVGElement | null>;

  /**
   * Set a zoom factor of the canvas.
   */
  setZoom?: (factor: number) => void;

  /**
   * Zoom in on the canvas.
   */
  zoomIn?: () => void;

  /**
   * Zoom out on the canvas.
   */
  zoomOut?: () => void;
}

export const useZoom = ({
  disabled = false,
  zoom = 1,
  minZoom = -0.5,
  maxZoom = 1,
  onZoomChange
}: ZoomProps) => {
  const [factor, setFactor] = useState<number>(zoom - 1);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGesture(
    {
      onPinch: ({ offset: [d], event }) => {
        event.preventDefault();
        // TODO: Set X/Y on center of zoom
        const next = limit(d / 100, minZoom, maxZoom);
        setFactor(next);
        onZoomChange(next + 1);
      }
    },
    {
      enabled: !disabled,
      domTarget: svgRef,
      eventOptions: { passive: false }
    }
  );

  const setZoom = useCallback(
    (f: number) => {
      const next = limit(f, minZoom, maxZoom);
      setFactor(next);
      onZoomChange(next + 1);
    },
    [maxZoom, minZoom, onZoomChange]
  );

  const zoomIn = useCallback(() => {
    setZoom(factor + 0.1);
  }, [factor, setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(factor - 0.1);
  }, [factor, setZoom]);

  return {
    svgRef,
    zoom: factor + 1,
    setZoom,
    zoomIn,
    zoomOut
  } as ZoomResult;
};
