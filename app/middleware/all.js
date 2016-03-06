const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug')('middleware:request');

//  default app middleware
//  set port, CORS, logging, etc
module.exports = function(app) {
  debug('loading default middleware');
  app.set('port', (process.env.PORT || 3000));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
};
