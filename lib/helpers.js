'use strict';


// app-view
// app-control
// assets-js
// $-addClass
const rHelper = /^([^-]+)-(.+)$/;

exports.helperMissing = function() {
  const args = Array.from(arguments);
  const opts = args.pop();
  const root = opts.data.root;

  const helper = getHelper(root, opts.name);
  if (!helper) {
    throw new Error('unknow helper: ' + opts.name);
  }
  if (!helper.fn) {
    return helper.value;
  }

  const data = opts.hash;
  const len = args.length;
  if (len && typeof args[len - 1] === 'object') {
    assignIf(data, args.pop());
  }
  if (this !== root) {
    assignIf(data, this);
  }
  if (Object.keys(data).length) {
    args.push(data);
  }

  return helper.fn.apply(helper.ctx, args);
};


function getHelper(root, name) {
  const match = rHelper.exec(name);
  if (!match) {
    return;
  }

  const ctx = root[match[1]];
  if (!ctx) {
    return;
  }

  const value = ctx[match[2]];
  const fn = typeof value === 'function' ? value : null;

  return { ctx, value, fn };
}


function assignIf(des, src) {
  for (const k in src) {
    if (des[k] === undefined) {
      des[k] = src[k];
    }
  }
  return des;
}
