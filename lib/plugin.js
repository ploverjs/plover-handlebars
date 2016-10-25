'use strict';


module.exports = function(app) {
  app.addEngine('hbs', require('./index'));
};
