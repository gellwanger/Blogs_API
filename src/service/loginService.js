const { User } = require('../database/models');
const getToken = require('../utils/token');

const BAD_REQUEST = 400;
const message1 = 'Some required fields are missing';
const message2 = 'Invalid fields';

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  
  if (!email || !password) {
    return { status: BAD_REQUEST, message: message1 };
  }
  
  if (!user) {
    return { status: BAD_REQUEST, message: message2 };
  }

  const { id } = user;
  const token = getToken(id, email);

  return { token };
};

module.exports = loginService;