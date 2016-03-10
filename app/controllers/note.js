const resource = require('../resources/notes');

module.exports = {
  list: resource.fetch,
  create: (note) => {
    return new Promise((resolve, reject) =>
      Promise.all([
        resource.create(note),
        resource.fetch()
      ])
      .then(notes =>
        resolve(notes[1].concat(notes[0]))
      )
      .catch(reject)
    );
  }
};
