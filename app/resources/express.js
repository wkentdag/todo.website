const express = require('express');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('resources:express');

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      debug('loading express resource');
      let app = express();
      app.set('port', (process.env.PORT || 3000));

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
  },
  listen: (server, port) => {
    return new Promise((resolve, reject) => {
      server.listen(port)
      .on('listening', () => {
        console.log(`Server \n\tlistening \n\t\t@localhost\n\t\t\t:${port}`);
        resolve(server);
      })
      .on('error', (err) => {
        console.error('\x1b[31m', `HTTP connection error`);
        console.error(err.stack);
        reject(err);
      });
    })
  }
};
