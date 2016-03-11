const path = require('path');
const fs = require('fs');
const debug = require('debug')('resources:socket')
module.exports = {
  //  bind socket.io to http server,
  //  forward incoming connections to bootstrapper
  listen: (server) => {
    debug(`resource.socket.listen`);
    let io = require('socket.io')(server);
    console.log(`websocket\n\topen\n\t\t@localhost\n\t\t\t:${server.address().port} `)
    io.on('connection', module.exports.bootstrap);
  },

  //  bind event handlers to a live connection
  bootstrap: (socket) => {
    debug(`resource.socket.bootstrap`);
    return new Promise((resolve,reject) => {
      socket.emit('test', {foo: 'bar'});

      let handlers = fs.readdirSync(path.join(__dirname,'../sockets'));
      handlers.forEach(h =>
        require(path.join(__dirname, `../sockets/${h}`))(socket)
      );

      resolve(socket);
    });
  }

};
