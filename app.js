var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var characters = require('./routes/characters');
var characterCreate = require('./routes/characterCreate');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/dungeon-butler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(app.router);

app.get('/', routes.index);
app.get('/loginForm', routes.loginForm);
app.post('/login', routes.login(db));
app.post('/register', routes.register(db));
app.post('/getRaces', characterCreate.getRaces(db));
app.post('/getClasses', characterCreate.getClasses(db));
app.post('/getCharacterList', characters.getCharacterList(db));
app.post('/getCharacter', characters.getCharacter(db));
app.post('/saveCharacterTemplate', characterCreate.saveCharacterTemplate(db));
app.post('/deleteCharacter', characterCreate.deleteCharacter(db));
app.post('/getPowers', characterCreate.getPowers(db));

app.get('/characters', characters.characters);
app.get('/characterCreate', characterCreate.characterCreate);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.log(req.path);
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
        error: {}
    });
});

module.exports = app;
