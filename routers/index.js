'use strict';

const routes = {};
const currenApiVersion = '/api/v1';

routes.user = require('./user');
//routes.admin = require('./admin');
const attach = app => {
  app.use(currenApiVersion + '/', routes.user);
  return app;
};

module.exports.attach = attach;
