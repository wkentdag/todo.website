var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var NOTES_FILE = path.join(__dirname, 'notes.json');

app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/notes', (req, res)=> {
  fs.readFile(NOTES_FILE, (err, data)=> {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res)=> {
  fs.readFile(NOTES_FILE, (err, data)=> {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var notes = JSON.parse(data);
    notes.push({
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    });
    fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 4), (err)=> {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(notes);
    });
  });
});


app.listen(app.get('port'), () => {
  console.log('Server \n\listening \n\t\t@localhost\n\t\t\t:%s', app.get('port'));
});
