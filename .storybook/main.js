const { resolve } = require('path');
const codesandbox = require('remark-codesandbox');
const reaflowCodesandboxTemplatePackageJSON = require('../docs/tools/templates/reaflow-codesandbox-template/package.json');

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.tsx',
    '../stories/**/*.stories.tsx',
  ],
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
  ],
  webpackFinal: (config) => {
    const mdxRule = config.module.rules.find((rule) =>
      rule.test.test('.stories.mdx')
    );

    const {
      options: { remarkPlugins }
    } = mdxRule.use.find(
      ({ loader }) => loader === require.resolve('@mdx-js/loader')
    );

    remarkPlugins.push([
      codesandbox,
      {
        mode: 'iframe',
        query: {
          fontsize: 14
        },
        customTemplates: {
          reaflow: {
            extends: `file:${resolve(
              __dirname,
              '../docs/tools/templates/reaflow-codesandbox-template'
            )}`,
            entry: 'src/App.js'
          },
          'reaflow-map': {
            extends: 'reaflow',
            files: {
              'package.json': {
                content: {
                  ...reaflowCodesandboxTemplatePackageJSON,
                  dependencies: {
                    ...reaflowCodesandboxTemplatePackageJSON.dependencies,
                    'elkjs': 'latest'
                  }
                }
              }
            }
          }
        },
        autoDeploy: true
      }
    ]);

    return config;
  }
};
