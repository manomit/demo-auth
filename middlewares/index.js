const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

module.exports = app => {
  app
    .use(helmet())
    .use(compression())
    .use(logger('dev'))
    .use(bodyParser.json({ limit: '10mb' }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
  return app;
};
