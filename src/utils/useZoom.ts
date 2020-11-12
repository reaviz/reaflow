import { useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';

const MIN_ZOOM = -0.5;
const MAX_ZOOM = 1;

const limit = (scale: number, min = MIN_ZOOM, max = MAX_ZOOM) =>
  (scale < max ? (scale > min ? scale : min) : max);

export const useZoom = ({
  disabled = false,
  defaultZoom = -0.3
}) => {
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGesture(
    {
      onPinch: ({ offset: [d, a], event }) => {
        event.preventDefault();
        // TODO: Set X/Y on center of zoom
        setZoom(limit(d / 100, MIN_ZOOM, MAX_ZOOM));
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
    scale: 1 + zoom
  };
};
