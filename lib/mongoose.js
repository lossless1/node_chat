let mongoose = require('mongoose');
let async = require('async');
let config = require('../config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));

mongoose.set('debug', mongoose.set('debug', true));

module.exports = mongoose;
