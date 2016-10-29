'use strict';


const handlebars = require('handlebars');


handlebars.registerHelper(require('./helpers'));


exports.compile = function(source, settings) {
  const opts = Object.assign({}, settings.handlebars);
  return handlebars.compile(source, opts);
};

