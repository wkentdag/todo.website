const debug = require('debug')('socket:note');
const notes = require('../controllers/note');

module.exports = (socket) => {
  debug('loading notes socket');

  socket.on('note:new', data => {
    notes.create(data.note)
    .then(note => {
      console.log(note);
      socket.emit('note:new', {note: note} );
    })
    .catch(err => {
      socket.emit('note:new:error', {error: err});
    });
  });

  socket.on('note:complete', data => {
    console.log(`data ${JSON.stringify(data)}`);

  });
}
