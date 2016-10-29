'use strict';


const pathUtil = require('path');
const sinon = require('sinon');
const mm = require('plover-test-mate');
const Logger = require('plover-logger');


/* eslint max-nested-callbacks: [2, 4] */


describe('plover-handlebars/lib/plugin', () => {
  const app = mm({
    applicationRoot: pathUtil.join(__dirname, 'fixtures/app'),
    expectRoot: pathUtil.join(__dirname, 'fixtures/expect'),
    port: 6100
  });

  app.use('plover-assets');
  app.use('plover-xview');

  app.use(require('../lib/plugin'));

  app.it('/index/books', 'books.html');
  app.it('/', 'index.html');


  describe('helper not found', () => {
    beforeEach(() => {
      sinon.stub(Logger.prototype, 'error');
    });


    afterEach(() => {
      Logger.prototype.error.restore();
    });


    [
      '/index/invalidFormat',
      '/index/ctxNotFound'
    ].forEach((url) => {
      it(url, () => {
        return app.get(url)
          .expect(/Error: unknow helper:/);
      });
    });
  });
});
