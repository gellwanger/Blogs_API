const Joi = require('joi');
const { User } = require('../database/models');
const getToken = require('../utils/token');

const NOT_FOUND = 404;
const CONFLICT_REQUEST = 409;
const message1 = 'User already registered';
const message2 = 'User does not exist';

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const createNewUser = async (user) => {
  const { error } = schema.validate(user);
  if (error) throw error;
  
  const newUser = await User.findOne({ where: { email: user.email } });
  if (newUser) {
    return { status: CONFLICT_REQUEST, message: message1 };
  }

  const { id } = await User.create(user);

  const token = getToken(id, user.email);

  return { token };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ 
    where: { id }, 
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { status: NOT_FOUND, message: message2 };
  }

  return user;
};

module.exports = {
  createNewUser,
  getAll,
  getById,
};
