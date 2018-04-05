exports.config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: '/foosball-ui',
      dir: 'docs'
    }
  ]
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
};
