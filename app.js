var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var appRoutes = require('./routes/app');
var tattooistsRoutes = require('./routes/tattooists');
var peopleRoutes = require('./routes/people');
var imagesRoutes = require('./routes/images');
var studiosRoutes = require('./routes/studios');

var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended: false,limit:'5mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(err){
	if(err){
		console.log("NOT CONNECTED");
		process.exit(1);
	}
	else{
		console.log("CONNECTED SUCCESSFULLY")
	}
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);
app.use('/tattooists',tattooistsRoutes);
app.use('/people',peopleRoutes);
app.use('/images',imagesRoutes);
app.use('/studios',studiosRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
