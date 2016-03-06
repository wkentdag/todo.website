const debug = require('debug')('api:note');
const notes = require('../controllers/note');

module.exports = function(app) {
  debug('loading notes api');

  app.get('/api/notes', (req, res)=> {
    notes.list()
    .then(data => res.json(data))
    .catch(res.handle);
  });

  app.post('/api/notes', (req, res)=> {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    notes.create(req.body)
    .then(notes => {
      console.log(notes);
      res.status(201).json(notes);
    })
    .catch(res.handle);
  });
};
