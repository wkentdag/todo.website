var resource = require('../resources/notes');

module.exports = {
  list: resource.fetch,
  create: (note) => { //  return complete list
    return new Promise((resolve, reject) => {
      Promise.all([
        resource.fetch(),
        resource.create(note)
      ])
      .then(notes => {
        resolve(notes[0].concat(notes[1]));
      })
      .catch(err => reject(err));
    });
  }
};
