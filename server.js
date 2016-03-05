var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
require('./app/apis/note')(app);

app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.listen(app.get('port'), () => {
  console.log('Server \n\listening \n\t\t@localhost\n\t\t\t:%s', app.get('port'));
});

module.exports = app;
