const fs = require('fs');
const path = require('path');
const NOTES_FILE = path.resolve(__dirname, '../../notes.json');

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
      module.exports.fetch()
      .then(notes => notes.concat({
        id: Date.now(),
        due: note.due,
        text: note.text
      }))
      .then(updated => console.log(updated))
      .then(updated => {
        fs.writeFile(NOTES_FILE,
          JSON.stringify(updated,null,2), (err) => {
          (err)? reject(err) :resolve(updated);
        })
      })
      .catch(err => reject(err));
    });
  }
};
