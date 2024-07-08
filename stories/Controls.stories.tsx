import React, { useRef, useState } from 'react';
import { Canvas, CanvasRef } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { CanvasPosition } from '../src/types';

export default {
  title: 'Demos/Controls',
  component: Canvas,
  subcomponents: {
    Node,
    Edge,
    MarkerArrow,
    Arrow,
    Icon,
    Label,
    Port,
    Remove,
    Add
  }
};

export const FixedPosition = () => (
  <div style={{ border: 'solid 1px #12131e', height: 450, width: 450, position: 'relative' }}>
    <Canvas
      pannable={false}
      nodes={[
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);


export const Small = () => (
  <div style={{ border: 'solid 1px #12131e', height: 200, width: 200, position: 'relative' }}>
    <Canvas
      height={150}
      width={150}
      disabled={true}
      fit={true}
      pannable={false}
      arrow={null}
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
        },
        {
          id: '3',
          text: '3'
        },
        {
          id: '4',
          text: '4'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        },
        {
          id: '1-4',
          from: '1',
          to: '4'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const NonCentered = () => (
  <div style={{ border: 'solid 1px #12131e', height: 450, width: 450, position: 'relative' }}>
    <Canvas
      pannable={false}
      defaultPosition={null}
      nodes={[
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const TopPosition = () => (
  <div style={{ border: 'solid 1px #12131e', height: 450, width: 450, position: 'relative' }}>
    <Canvas
      pannable={false}
      defaultPosition={CanvasPosition.TOP}
      nodes={[
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);


export const Fit = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      fit={true}
      nodes={[
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const Zoom = () => {
  const [zoom, setZoom] = useState<number>(0.7);
  const ref = useRef<CanvasRef | null>(null);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <pre style={{ zIndex: 9, position: 'absolute', bottom: 15, right: 15, background: 'rgba(0, 0, 0, .5)', padding: 20, color: 'white' }}>
        Zoom: {zoom}<br />
        <button style={{ display: 'block', width: '100%', margin: '5px 0' }} onClick={() => ref.current.zoomIn()}>Zoom In</button>
        <button style={{ display: 'block', width: '100%', margin: '5px 0' }} onClick={() => ref.current.zoomOut()}>Zoom Out</button>
        <button style={{ display: 'block', width: '100%' }} onClick={() => ref.current.fitCanvas(true)}>Fit</button>
        <button style={{ display: 'block', width: '100%' }} onClick={() => ref.current?.fitToNode('1')}>Fit to Node 1</button>
        <button style={{ display: 'block', width: '100%' }} onClick={() => ref.current?.fitToNode('2')}>Fit to Node 2</button>
      </pre>
      <Canvas
        maxZoom={10}
        minZoom={-0.9}
        maxWidth={3000}
        maxHeight={1500}
        zoom={zoom}
        ref={ref}
        nodes={[
          {
            id: '1',
            text: 'Node 1'
          },
          {
            id: '2',
            text: 'Node 2'
          },
          {
            id: '3',
            text: 'Node 3'
          }
        ]}
        edges={[
          {
            id: '1-2',
            from: '1',
            to: '2'
          },
          {
            id: '1-3',
            from: '1',
            to: '3'
          }
        ]}
        onZoomChange={z => {
          console.log('zooming', z);
          setZoom(z);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const DragPan = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      fit={true}
      panType="drag"
      nodes={[
        {
          id: '1',
          text: 'Node 1'
        },
        {
          id: '2',
          text: 'Node 2'
        },
        {
          id: '3',
          text: 'Node 3'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        },
        {
          id: '1-3',
          from: '1',
          to: '3'
        }
      ]}
      onLayoutChange={(layout) => console.log('Layout', layout)}
    />
  </div>
);
