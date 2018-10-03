module.exports = {
  parser: 'postcss-scss',
  plugins: {

    'postcss-preset-env': {},
    'precss': {},
    'autoprefixer': {},
    'postcss-pxtorem': {
      propList: ['*'],
    },
  },
  sourcemap: true
};
