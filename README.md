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
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, 'backgroundColor': '#F5F5F5'}}>
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

## Using the `reaflow` package locally as a dependency

If you're working on some app **that uses `reaflow` as a dependency**, and if you want to quickly update the code of `reaflow` locally (without publishing changes to NPM), you basically have two choices:
- [Use Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- Use [NPM](https://docs.npmjs.com/cli/v6/commands/npm-link)/[Yarn](https://classic.yarnpkg.com/en/docs/cli/link/) `link` feature

At this time, we don't have an official recommandation about which one to use, it's up to you.

### Using `link`

Using NPM/Yarn link will link your dependencies on your main project to your local `reaflow` folder.

> :warning: Beware: The "link" might break quite often when installing new dependencies on your main project, and you'll need to unlink and link back again to fix it.

#### Configuration example (with Yarn):

1. From your local `reaflow` folder, run `yarn install` and then `yarn link:reaflow`, which will create the links in yarn
1. From your main project folder, run `yarn link reaflow && yarn link react && yarn link react-dom`
  - _We suggest adding it as a command in your package.json: `"link:reaflow": "yarn link reaflow && yarn link react && yarn link react-dom"`_ - [See example](https://github.com/Vadorequest/poc-nextjs-reaflow/blob/cf8499008c4b70946d82803741401fac48264a5b/package.json#L8)
1. **If you edit the `reaflow` files** and need to recompile the project then run `yarn build:watch` from your local `reaflow` folder (changes will be applied immediately, you'll benefit from hot-reloading, etc.)

Once everything is linked, your main project will use the files in your local `reaflow` folder.
While `yarn build:watch` is running, your changes from `reaflow` will automatically apply to your main project.

#### :warning When the link breaks

When you install new dependencies in your main project, it might break the links with `reaflow`.

To fix it, you'll need to remove your `node_modules` folder and reinstall all packages **on both** your main project and `reaflow`, starting with `reaflow`.
1. From `reaflow` folder: `rm -rf node_modules && yarn && yarn link:reaflow`
1. From your main project folder: `rm -rf node_modules && yarn && yarn link:reaflow`
