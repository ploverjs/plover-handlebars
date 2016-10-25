'use strict';


const handlebars = require('handlebars');
const helpers = require('./helpers');


handlebars.registerHelper(helpers);


exports.compile = function(source, settings) {
  const opts = Object.assign({
    strict: true
  }, settings.handlebars);


  const helpers = opts.helpers || {};
  return handlebars.compile(source, opts);
};

