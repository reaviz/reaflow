import { useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';

const limit = (scale: number, min: number, max: number) =>
  scale < max ? (scale > min ? scale : min) : max;

export interface ZoomProps {
  disabled?: boolean;
  scale?: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomChange: (zoom: number) => void;
}

export const useZoom = ({
  disabled = false,
  scale = 1,
  minZoom = -0.5,
  maxZoom = 1,
  onZoomChange
}: ZoomProps) => {
  const [factor, setFactor] = useState<number>(scale - 1);
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

  const setZoom = (f: number) => {
    const next = limit(f, minZoom, maxZoom);
    setFactor(next);
    onZoomChange(next + 1);
  };

  const zoomIn = () => {
    setZoom(factor + 0.1);
  };

  const zoomOut = () => {
    setZoom(factor - 0.1);
  };

  return {
    svgRef,
    scale: factor + 1,
    setZoom,
    zoomIn,
    zoomOut
  };
};
