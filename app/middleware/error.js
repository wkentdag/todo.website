const debug = require('debug')('middleware:error');

module.exports = function(app) {
  debug('loading error middleware');
  app.use(function(err, req, res, next) {
    if (!err) return next();

    console.error('\x1b[31m', 'uncaught error');
    console.error('\x1b[31m', err);
    console.error('\x1b[31m', err.stack);
    res.status(500).json({error: err});
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    let msg = `${req.originalUrl} not found`;
    res.status(404).send(new Error(msg));
  });
}
