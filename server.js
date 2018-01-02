const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

var index = require('./routes/index');
var swgoh = require('./routes/swgoh');
var utility = require('./routes/utility');

var app = express();
app.use(compression());

// load the env vars
require('dotenv').load();

// connect to MongoDB with mongoose
// require('./config/database');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/swgoh', swgoh);
app.use('/api/v1/utility', utility);

module.exports = app;
