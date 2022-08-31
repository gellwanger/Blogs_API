const categoryService = require('../service/categoryService');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(OK_STATUS).json(categories);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(CREATED_STATUS).json(category);
  } catch (error) {
      next(error);
  }
};

module.exports = {
  createCategory,
  getAll,
};
