'use strict';


// app-view
// app-control
// assets-js
// $-addClass
const rHelper = /^([^-]+)-(.+)$/

exports.helperMissing = function() {
  const args = Array.from(arguments);
  const opts = args.pop();
  const match = rHelper.exec(opts.name);
  if (!match) {
    throw new Error('Unknow helper: ' + opts.name);
  }

  const root = opts.data.root;
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

  const o = root[match[1]];
  return o[match[2]].apply(o, args);
};


function assignIf(des, src) {
  for (const k in src) {
    if (des[k] === undefined) {
      des[k] = src[k];
    }
  }
  return des;
}
