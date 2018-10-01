module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-pxtorem': {
      propList: ['*'],
    },
    'postcss-preset-env': {},
    'precss': {},
  },
  sourcemap: true
};
