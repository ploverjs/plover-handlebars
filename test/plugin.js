'use strict';


const pathUtil = require('path');
const mm = require('plover-test-mate');



describe('plover-handlebars/lib/plugin', () => {
  const app = mm({
    applicationRoot: pathUtil.join(__dirname, 'fixtures/app'),
    expectRoot: pathUtil.join(__dirname, 'fixtures/expect')
  });

  app.use(require('../lib/plugin'));

  app.it('/', 'index.html');
});