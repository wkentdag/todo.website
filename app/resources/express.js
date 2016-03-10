const express = require('express');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('config:express');

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      debug('loading express config');
      let app = express();

      //  load models
      const models = fs.readdirSync(path.join(__dirname, '../models'));
      models.forEach(f => require(path.join(__dirname, `../models/${f}`)));

      //  serve index page
      app.use('/', express.static(path.join(__dirname, '../../dist')));

      //  bootstrap middleware
      require('../middleware/all')(app);

      //  load apis
      const apis = fs.readdirSync(path.join(__dirname, '../apis'));
      apis.forEach(f => require(path.join(__dirname, `../apis/${f}`))(app));

      //  catch unhandled errors
      require('../middleware/error')(app);

      resolve(app);
    })
  }
};
