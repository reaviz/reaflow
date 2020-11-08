import theme from './theme';

const order = [
  'introduction-',
  'getting-started-',
  'components-',
  'docs-',
  'demos-'
];

export const parameters = {
  layout: 'centered',
  docs: {
    theme
  },
  options: {
    showRoots: true
  },
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: (a, b) => {
      const aName = a[0];
      const bName = b[0];

      if (aName.includes('docs-') || bName.includes('docs-')) {
        const aIdx = order.findIndex(i => aName.indexOf(i) > -1);
        const bIdx = order.findIndex(i => bName.indexOf(i) > -1);
        return aIdx - bIdx;
      }

      return aName < bName ? -1 : 1;
    }
  },
};
