const debug = require('debug')('client:providers:note');
const request = require('../resources/request.js');

let appendUrlˆ = (data, stem) => Promise.resolve(
  data.map(d => {
    d.url = stem + `/${d._id}`;
    return d;
  })
);

module.exports = {
  list: (url) => {
    debug(`listing ${url}`);
    return new Promise((resolve, reject) =>
      request.get(url)
      .then(data => appendUrlˆ(data, url))
      .then(resolve)
      .catch(reject)
    )
  },
  create: (url, socket, note) => {
    return new Promise((resolve, reject) => {
      debug(`creating note ${note}`);
      if (!socket || (socket && !socket.connected)) {
        request.post(url, note)
        .then(data => appendUrlˆ(data, url))
        .then(resolve)
        .catch(reject);
      } else {
        socket.emit('note:new', {note: note});
        resolve('sent');
      }
    })
  },
  update: (url, socket, completed, id) => {
    return new Promise((resolve, reject) => {
      debug(`updating note ${id} status`);
      if (!socket || (socket && !socket.connected))
        return resource.patch(url);

      socket.emit('note:complete', {completed: completed, _id: id});
      return Promise.resolve('sent');
    })

  }
};
