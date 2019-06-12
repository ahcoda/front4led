const proxy = require ('http-proxy-middleware');

const setupProxy = function (app) {
  console.log ('proxy');
  console.log ('sdfsdf');

  app.use (
    proxy ('/api', {
      target: 'http://www.yiqibangbang.com:8080/',
      changeOrigin: true,
    })
  );
};

module.exports = setupProxy;
