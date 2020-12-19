module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.tsx',
    '../stories/**/*.stories.tsx',
  ],
  addons: [
    'storybook-css-modules-preset',
    '@storybook/addon-essentials',
    '@storybook/addon-docs/preset',
    '@storybook/addon-storysource'
  ]
};
