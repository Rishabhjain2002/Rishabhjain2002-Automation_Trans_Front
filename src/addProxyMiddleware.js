const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function addProxyMiddleware(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.49.104.89:8080/api/v1/dags/unlocking_Script/dagRuns',
      changeOrigin: true,
    }),
  );
};