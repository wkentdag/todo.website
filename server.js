const http = require('http');
const mongoose = require('mongoose');
const debug = require('debug')('server');
import express from './app/resources/express';
import socket from './app/resources/socket';

let connectˆ = () => {
  return new Promise((resolve, reject) =>
    mongoose.connect(process.env.DB, (err) =>
      (err)? reject(err) : resolve(mongoose.connection)
    )
  );
}

//  connect to db,
//  init express app, start server,
//  init websocket server and bind handlers
const app = connectˆ()
.then(express.start)
.then(app =>
  express.listen(http.Server(app), app.get('port'))
)
.then(server => {
  socket.listen(server)
})
.then(io =>
  console.log(`end of the line ${io}`)
)
.catch(err => {
  console.error('\x1b[31m', err);
  console.error(err.stack);
  process.exit(1);
});

export default app;
