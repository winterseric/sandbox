var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  collections = require('./routes/collections'),
  firearms = require('./routes/collections/firearms'),
  airguns = require('./routes/collections/airguns'),
  movies = require('./routes/collections/movies'),
  about = require('./routes/about'),
  contact = require('./routes/contact'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/collections', collections);
app.use('/collections/firearms', firearms);
app.use('/collections/firearms/create', firearms);
app.use('/collections/firearms/post', firearms);
app.use('/collections/firearms/update', firearms);
app.use('/collections/firearms/delete', firearms);
app.use('/collections/airguns', airguns);
app.use('/collections/airguns/create', airguns);
app.use('/collections/airguns/post', airguns);
app.use('/collections/airguns/update', airguns);
app.use('/collections/airguns/delete', airguns);
app.use('/collections/movies', movies);
app.use('/collections/movies/create', movies);
app.use('/collections/movies/post', movies);
app.use('/collections/movies/update', movies);
app.use('/collections/movies/delete', movies);
app.use('/about', about);
app.use('/contact', contact);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;