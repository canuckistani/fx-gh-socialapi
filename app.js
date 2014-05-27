var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var oauth = require('./routes/oauth');
var session = require('express-session');

var exphbs  = require('express3-handlebars'),
    app = express();

var hbConfig = {
    defaultLayout: 'main',
    partialsDir: [
        'views/partials'
    ]
};

app.engine('handlebars', exphbs(hbConfig));
app.set('view engine', 'handlebars');
// app.set('env', 'development');

var sessionConfig = {
    secret: 'keyboard cat',
    name: 'sid'
};

app.use(favicon());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser());
// app.use(session(sessionConfig));
// app.use(express.session({ store: new RedisStore() }));

// var RedisStore = require('connect-redis')(session);

app.use(cookieParser());
app.use(express.cookieSession({
  key: 'app.sess',
  secret: 'SUPERsekret'
}));

app.use(app.router);
app.set('DEBUG', true);

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/oauth', oauth.oauth);
app.get('/sidebar', routes.sidebar);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
