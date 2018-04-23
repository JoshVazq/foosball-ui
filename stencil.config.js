const sass = require('@stencil/sass');
exports.config = {
  outputTargets: [
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: {
        swSrc: 'src/sw.js'
      },
    }
  ],
  globalStyle: 'src/global/app.css',
  plugins: [
    sass()
  ],
  copy: [
    { src: 'dragAndDrop.js' }
  ]
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
};
