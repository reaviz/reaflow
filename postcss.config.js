module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-preset-env')({ stage: 1 }),
    require('autoprefixer')
  ]
};
