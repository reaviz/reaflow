module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true
        }
      }
    },
    '@storybook/addon-essentials',
    '@storybook/addon-docs/preset',
    '@storybook/addon-storysource'
  ]
};
