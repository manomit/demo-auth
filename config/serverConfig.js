'use strict';

const fs = require('fs');

const serverConfig = {
  jwtAlgorithm: process.env.jwtAlgorithmShop,
  jwtSecret: process.env.jwtSecretShop
};

module.exports = {
  serverConfig: serverConfig,
};
