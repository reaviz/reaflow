/** @type {import('tailwindcss').Config} */
/* eslint-disable max-len */
import plugin from 'tailwindcss/plugin';
import { colorPalette } from 'reablocks';

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/reablocks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colorPalette.blue[500],
          active: colorPalette.blue[500],
          hover: colorPalette.blue[600],
          inactive: colorPalette.blue[200]
        },
        secondary: {
          DEFAULT: colorPalette.gray[700],
          active: colorPalette.gray[700],
          hover: colorPalette.gray[800],
          inactive: colorPalette.gray[400]
        },
        success: {
          DEFAULT: colorPalette.green[500],
          active: colorPalette.green[500],
          hover: colorPalette.green[600]
        },
        error: {
          DEFAULT: colorPalette.red[500],
          active: colorPalette.red[500],
          hover: colorPalette.red[600]
        },
        warning: {
          DEFAULT: colorPalette.orange[500],
          active: colorPalette.orange[500],
          hover: colorPalette.orange[600]
        },
        info: {
          DEFAULT: colorPalette.blue[500],
          active: colorPalette.blue[500],
          hover: colorPalette.blue[600]
        },
        background: {
          level1: colorPalette.white,
          level2: colorPalette.gray[950],
          level3: colorPalette.gray[900],
          level4: colorPalette.gray[800],
        },
        panel: {
          DEFAULT: colorPalette['black-pearl'],
          accent: colorPalette['charade']
        },
        surface: {
          DEFAULT: colorPalette['charade'],
          accent: colorPalette.blue[500]
        },
        typography: {
          DEFAULT: colorPalette['athens-gray'],
        },
        accent: {
          DEFAULT: colorPalette['waterloo'],
          active: colorPalette['anakiwa']
        },
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('disabled-within', '&:has(input:is(:disabled),button:is(:disabled))');
    })
  ],
};
