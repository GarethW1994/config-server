var express = require('express');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");
var cors = require('cors');
var route = require('./routes/routes');



//define mongo url
const mongoURL = process.env.MONGO_DB_URL ||'mongodb://localhost/config-server';
const Models = require('./models');
const models = Models(mongoURL);
var Router = route(models);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Accept', 'application/json');
  next();
});

app.use(cors());

// Get Route to get home
app.get('/', Router.index);

// Get route to read the config data from the database
app.get('/readconfig', Router.readconfig);

// Post Route For Updating the config
app.post('/writeconfig', Router.writeconfig);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next();
});

// PORT
const port = 3100;

app.listen(port, function(){
    console.log("Express App Running at port " + port);
});