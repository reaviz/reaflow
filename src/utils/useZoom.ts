import { useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';

const MIN_ZOOM = -0.5;
const MAX_ZOOM = 1;

const limit = (scale: number, min = MIN_ZOOM, max = MAX_ZOOM) =>
  (scale < max ? (scale > min ? scale : min) : max);

export interface ZoomProps {
  disabled?: boolean;
  scale?: number;
  onZoomChange: (zoom: number) => void;
}

export const useZoom = ({
  disabled = false,
  scale = 1,
  onZoomChange
}: ZoomProps) => {
  const [factor, setFactor] = useState<number>(scale - 1);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGesture(
    {
      onPinch: ({ offset: [d, a], event }) => {
        event.preventDefault();
        // TODO: Set X/Y on center of zoom
        const next = limit(d / 100, MIN_ZOOM, MAX_ZOOM);
        setFactor(next);
        onZoomChange(next + 1);
      },
    },
    {
      enabled: !disabled,
      domTarget: svgRef,
      eventOptions: { passive: false }
    }
  );

  return {
    svgRef,
    scale: factor + 1
  };
};
