var notes = require('../controllers/note');

module.exports = function(app) {
  app.get('/api/notes', (req, res)=> {
    notes.list()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => res.status(err.status || 500).send(err));
  });

  app.post('/api/notes', (req, res)=> {
    notes.create(req.body)
    .then(notes => {
      console.log(notes);
      res.json(notes)
    })
    .catch(err => res.status(err.status || 500).send(err));
  });
};
