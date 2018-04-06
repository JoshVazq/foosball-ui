const sass = require('@stencil/sass');
exports.config = {
  outputTargets: [
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: {
        swSrc: 'src/sw.js'
      },
      baseUrl: '/foosball-ui',
    }
  ],
  globalStyle: 'src/global/app.css',
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
};
