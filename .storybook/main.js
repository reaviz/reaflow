module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.tsx',
    '../stories/**/*.stories.tsx'
  ],
  addons: [
    'storybook-css-modules-preset',
    '@storybook/addon-docs/preset',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource'
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/
    });

    return config;
  }
};
