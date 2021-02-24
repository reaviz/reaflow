<p align="center">
  <h1>🕸 reaflow</h1>
  <br />
  Node-based Visualizations for React
  <br /><br />
  <a href="https://github.com/reaviz/reaflow/workflows/build/">
    <img src="https://github.com/reaviz/reaflow/workflows/build/badge.svg?branch=master" />
  </a>
  <a href="https://npm.im/reaflow">
    <img src="https://img.shields.io/npm/v/reaflow.svg" />
  </a>
  <a href="https://npm.im/reaflow">
    <img src="https://badgen.net/npm/dw/reaflow" />
  </a>
  <a href="https://github.com/reaviz/reaflow/blob/master/LICENSE">
    <img src="https://badgen.now.sh/badge/license/apache2" />
  </a>
  <a href="https://bundlephobia.com/result?p=reaflow">
    <img src="https://badgen.net/bundlephobia/minzip/reaflow">
  </a>
  <a href="https://discord.gg/tt8wGExq35">
    <img src="https://img.shields.io/discord/773948315037073409?label=discord">
  </a>
</p>

---

REAFLOW is a modular diagram engine for building static or interactive editors. The library is feature-rich and modular allowing for displaying complex
visualizations with total customizability.

## 🚀 Quick Links

- :point_right: Checkout the [**docs and demos**](https://reaflow.dev)
- :newspaper: Learn about updates from the [Changelog](CHANGELOG.md)
- Explore the library on [Chroma](https://www.chromatic.com/library?appId=5f99ba42fe88ac0022fd1147)

## 📦 Usage

Install the package via **NPM**:

```
npm i reaflow --save
```

Install the package via **Yarn**:

```
yarn add reaflow
```

## Usage with Create React App (no SSR support, client-side support only)

Add the component with some nodes and edges:

```jsx
import React from 'react';
import { Canvas } from 'reaflow';

export default () => (
  <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, 'background-color': 'lightgrey' }}>
      <Canvas
        maxWidth={800} // Use small canvas dimensions to make sure the nodes appear on screen immediately
        maxHeight={600}
        nodes={[
          {
            id: '1',
            text: '1'
          },
          {
            id: '2',
            text: '2'
          }
        ]}
        edges={[
          {
            id: '1-2',
            from: '1',
            to: '2'
          }
        ]}
      />
    </div>
  </div>
);
```

## Usage with Next.js framework

The Next.js framework supports SSR, but the `Canvas` component shouldn't be rendered on the server.
_It won't crash the app, but it'd print a lot of noisy warnings on the server, though._

`pages/index.tsx`:
```tsx
import React from 'react';
import { Canvas } from 'reaflow';

const Page = () => {
  return (
    <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, 'background-color': 'lightgrey'}}>
        {
          // Don't render the Canvas on the server
          typeof window !== 'undefined' && (
            <Canvas
              maxWidth={800} // Use small canvas dimensions to make sure the nodes appear on screen immediately
              maxHeight={600}
              nodes={[
                {
                  id: '1',
                  text: '1'
                },
                {
                  id: '2',
                  text: '2'
                }
              ]}
              edges={[
                {
                  id: '1-2',
                  from: '1',
                  to: '2'
                }
              ]}
            />
          )
        }
      </div>
    </div>
  )
};

export default Page;
```

## Community showcases

- [POC Next.js + Reaflow](https://github.com/Vadorequest/poc-nextjs-reaflow): Uses Reaflow to build a "**decision tree**". 
  Advanced use-case with different kinds of nodes with heavy usage of `foreignObject` to display actual HTML within the nodes themselves.
  Hosted on Vercel and built with Next.js 10.

---

# 🔭 Contributing

## Getting started

- `yarn install`
- `yarn start` opens Storybook documentation on [localhost:9009](http://localhost:9009)
