const mongoose = require('mongoose');
const Note = mongoose.model('Note');

mongoose.Promise = global.Promise;

module.exports = {
  fetch: () => {
    return new Promise((resolve,reject) =>
      Note.find().exec()
      .then(resolve)
      .catch(reject)
    );
  },
  create: (note) => {
    return new Promise((resolve, reject) => {
      let doc = new Note(note);
      doc.save()
      .then(resolve)
      .catch(reject);
    });
  }
};
