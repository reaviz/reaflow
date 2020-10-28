module.exports = function(api) {
  api.cache.forever();

  const presets = [
    ['@babel/preset-env',
    {
      targets: {
        esmodules: true
      }
    }],
    '@babel/preset-react',
    ['@babel/typescript', { isTSX: true, allExtensions: true }]
  ];

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining'
  ];

  return {
    presets,
    plugins
  };
};
