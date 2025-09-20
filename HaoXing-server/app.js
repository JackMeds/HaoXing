var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userListRouter = require('./routes/userList');
var newsListRouter = require('./routes/newsList');
var gouwucarRouter = require('./routes/gouwucar');
var shoplistRouter = require('./routes/shoplist');
var tagRouter = require('./routes/tag');
var NTS = require('./routes/NTS');
var recordRouter = require('./routes/record');


var app = express();

const fs = require('fs');
const logFilePath = path.join(__dirname, 'app.log');
const config = require('./config.json');
const port = config.port;

app.set('view engine', 'ejs');
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8082']
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userList', userListRouter);
app.use('/newsList', newsListRouter);
app.use('/gouwucar',gouwucarRouter);
app.use('/shoplist',shoplistRouter);
app.use('/tag',tagRouter);
app.use('/NTS',NTS);
app.use('/record',recordRouter);




app.use(express.static(path.join(__dirname, 'public')))




function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

log('Application started');



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
