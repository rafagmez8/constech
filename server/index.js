const express = require('express'),
      path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var api = require('./routes/api');
mongoose.Promise = require('bluebird');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static('./dist/constech'));
app.use('/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// mongoose connection
// Warning mongoose 5.x: replace useMongoClient: true, with useNewUrlParser: true,
mongoose.connect('mongodb://rafaadmin:rafaadmin1@ds213472.mlab.com:13472/project-ammeters',
  { useNewUrlParser: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('Succesful connection to the database'))
    .catch((err) => console.error(err));

module.exports = app;
