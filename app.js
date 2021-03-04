require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var DB = require('./model/connection');

var usersRouter = require('./routes/index');

var app = express();

app.use(cors({ credentials: true, origin: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', usersRouter);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

DB.sync()
    .then(function () {
        console.log('Nice! Database looks fine');
    })
    .catch(function (err) {
        console.log(err, 'Something went wrong with the Database Update!');
    });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
