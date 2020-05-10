const jwt = require('jsonwebtoken');
const configs = require('../config');

module.exports.getToken = async rawData => {
  try {
    if (typeof rawData === 'object' && !Array.isArray(rawData)) {
      const jwtData = {};
      jwtData.exp = Number(
        Math.floor(Date.now() / 1000) + (60 * 60 * 2)
      );
      jwtData.data = rawData;
      
      const token = await jwt.sign(
        jwtData,
        configs.server.serverConfig.jwtSecret,
        { algorithm: configs.server.serverConfig.jwtAlgorithm }
      );
      return token;
    }
    return {
      err: 'Failed',
      statusCode: 500
    };
  } catch (err) {
    return err;
  }
};

module.exports.verifyToken = async token => {
  const decoded = await jwt.verify(
    token,
    configs.server.serverConfig.jwtSecret,
    { algorithm: configs.server.serverConfig.jwtAlgorithm }
  );
  return decoded;
};
