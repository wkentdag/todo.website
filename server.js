const mongoose = require('mongoose');
const debug = require('debug')('server');
import express from './app/resources/express';

let connectˆ = () => {
  return new Promise((resolve, reject) =>
    mongoose.connect(process.env.DB, (err) =>
      (err)? reject(err) : resolve(mongoose.connection)
    )
  );
}

let listenˆ = (app) => {
  return new Promise((resolve, reject) => {
    let port = app.get('port');

    app.listen(port)
    .on('listening', () => {
      console.log(`Server \n\listening \n\t\t@localhost\n\t\t\t:${port}`);
      resolve(app);
    })
    .on('error', (err) => {
      console.error('\x1b[31m', `HTTP connection error`);
      reject(err);
    });
  });
}

//  connect to db, init express app, start server
const app = connectˆ()
.then(express.start)
.then(listenˆ)
.catch(err => {
  console.error('\x1b[31m', err);
  console.error(err.stack);
  process.exit(1);
});

export default app;
