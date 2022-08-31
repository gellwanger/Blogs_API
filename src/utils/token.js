const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const getToken = (id, email) => jwt.sign({ id, email }, secret, jwtConfig);

module.exports = getToken;
