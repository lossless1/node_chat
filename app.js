let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let errorHandler = require('errorhandler');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.url === '/') {
    res.end("Hello");
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/error') {
    next(new Error("HELLO MOTHERFATHER!!"));
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/test') {
    res.end("Test");
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(410).send("Page not found Sorry");
});

// // view engine setup

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  if (app.get('env') === 'development') {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  } else {
    console.log(123123);
    res.status(500).render("ERROR");
  }
});




module.exports = app;
