'use strict';


const assert = require('assert');


exports.view = function(name) {
  console.log(arguments);
  return this.app.view(name, data(options));
};


exports.control = function(name, options) {
  return this.app.control(name, data(options));
};


function data(options) {
  const hash = options.hash;
  return hash && Object.keys(hash).length > 0 ? hash : null;
}


const slice = [].slice;
exports.helper = function(exp) {
  const parts = exp.split(/\./);
  const obj = this[parts[0]];
  const method = parts[1];
  const args = slice.call(arguments, 1, -1);
  const hash = arguments[arguments.length - 1].hash;
  if (Object.keys(hash).length) {
    args.push(hash);
  }
  return obj[method].apply(obj, args);
};
