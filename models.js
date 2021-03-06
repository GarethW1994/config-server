'use strict'
const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const configSchema = mongoose.Schema({
    config: Array    
  });

  const myconfig = mongoose.model('configurations', configSchema);

  return {
    myconfig
  };
};