/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import fs from 'fs';
import path from 'path';

// Custom plugin to copy elk-worker.min.js to the output directory
const copyElkWorker = () => {
  return {
    name: 'copy-elk-worker',
    closeBundle() {
      const sourceFile = 'node_modules/elkjs/lib/elk-worker.min.js';
      const targetFile = 'dist/elk-worker.min.js';

      if (fs.existsSync(sourceFile)) {
        const content = fs.readFileSync(sourceFile);
        fs.writeFileSync(targetFile, content);
        console.log('Successfully copied elk-worker.min.js to dist directory');
      } else {
        console.error('Error: Could not find elk-worker.min.js in node_modules');
      }
    }
  };
};

export default defineConfig(({ mode }) =>
  mode === 'library'
    ? {
      plugins: [
        svgrPlugin(),
        tsconfigPaths(),
        cssInjectedByJsPlugin(),
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src']
        }),
        checker({
          typescript: true
        }),
        copyElkWorker() // Add the custom plugin
      ],
      test: {
        globals: true,
        environment: 'jsdom'
      },
      build: {
        minify: false,
        sourcemap: true,
        copyPublicDir: false,
        lib: {
          entry: resolve('src', 'index.ts'),
          name: 'reaflow',
          fileName: 'index'
        },
        rollupOptions: {
          plugins: [
            external({
              includeDependencies: true
            })
          ],
          output: {
            assetFileNames: 'assets/[name][extname]'
          }
        }
      }
    }
    : {
      plugins: [
        svgrPlugin(),
        tsconfigPaths(),
        react(),
        checker({
          typescript: true
        })
      ],
      test: {
        globals: true,
        environment: 'jsdom'
      }
    }
);
