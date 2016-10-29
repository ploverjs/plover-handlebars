'use strict';


const assert = require('assert');


exports.view = function() {
  return render(this, 'view', arguments);
};


exports.control = function() {
  return render(this, 'control', arguments);
};


function render(ctx, type, args) {
  const opts = args[args.length - 1];
  const root = opts.data.root;

  const name = args[0];
  const data = opts.hash;
  if (args.length > 2 && typeof args[1] === 'object') {
    assignIf(data, args[1]);
  }
  if (ctx !== root) {
    assignIf(data, ctx);
  }

  return root.app[type](name, data);
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


function assignIf(des, src) {
  for (const k in src) {
    if (des[k] === undefined) {
      des[k] = src[k];
    }
  }
  return des;
}
