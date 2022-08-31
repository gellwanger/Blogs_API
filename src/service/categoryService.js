const Joi = require('joi');
const { Category } = require('../database/models');

const schema = Joi.object({ name: Joi.string().required() });

const createCategory = async (data) => {
  const { error } = schema.validate(data);
  if (error) throw error;

  const { id } = await Category.create(data);

  const category = { id, ...data };

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAll,
};
