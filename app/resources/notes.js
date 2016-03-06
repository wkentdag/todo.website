const fs = require('fs');
const path = require('path');
const NOTES_FILE = path.resolve(__dirname, '../../notes.json');
const mongoose = require('mongoose');
const Note = mongoose.model('Note');

module.exports = {
  fetch: () => {
    return new Promise((resolve,reject) => {
      fs.readFile(NOTES_FILE, (err, data) =>
        (err)? reject(err) : resolve(JSON.parse(data))
      );
    });
  },
  create: (note) => {
    return new Promise((resolve, reject) => {
      let doc = new Note(note);
      doc.save((err,doc) =>
        (err)? reject(err) : resolve(doc)
      );
    });
  }
};
