const userService = require('../service/userService');

const createNewUser = async (req, res, next) => {
  try {
    const data = req.body;
    const token = await userService.createNewUser(data);
    if (token.status) next(token);
    return res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (user.status) next(user);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  getAll,
  getById,
};
