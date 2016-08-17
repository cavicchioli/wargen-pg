var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consign = require('consign');
var http = require("http");
var mongoose = require('mongoose');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//var config = require('./config/index.js');
 
consign()
  .include('app/controllers')
  .then('app/routes')
  .then('config')
  .into(app);

mongoose.connect(app.config.index.connectionString, function (err) {
    if (err)
        console.log(err)
    else
        console.log('conectou')
});

////catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});


//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

//console.log(app.config.index.port);
//console.log(process.env.NODE_ENV);


//app.all('/*', function(req,res) {
//	res.sendFile(__dirname + '/public/views/home.html');
//});
 
app.get('*', function(req,res) {	
	res.sendFile(__dirname + '/public/views/index.html');
	// body...
})


http.createServer(app).listen(app.config.index.port, function () {
    
    console.log('Express server listening on port ' + app.config.index.port +' mode: ' + process.env.NODE_ENV);
});


module.exports = app;
