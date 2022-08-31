const { Op } = require('sequelize');
const Joi = require('joi');
const { BlogPost, PostCategory, Category, User } = require('../database/models');

const schemaCreate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const schemaUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const checkCategory = async (categoryIds) => {
  const { rows } = await Category.findAndCountAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });
  return rows;
};

const createPostCategory = async (categories, postId) => {
  const newPostCat = categories.map((category) => ({ postId, categoryId: category.id }));
  await PostCategory.bulkCreate(newPostCat);
};

const createNewPost = async (userId, data) => {
  const { error } = schemaCreate.validate(data);
  if (error) return { status: 400, message: 'Some required fields are missing' };

  const { title, content, categoryIds } = data;

  const categories = await checkCategory(categoryIds);
  if (categories.length === 0) return { status: 400, message: '"categoryIds" not found' };

  const { id, createdAt, updatedAt } = await BlogPost.create(
    { title, content, userId },
  );
  
  await createPostCategory(categories, id);

  const newPost = {
    id,
    title,
    content,
    userId,
    updated: Date(updatedAt),
    published: Date(createdAt),
  };
    
  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{ 
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { 
      model: Category,
      as: 'categories',
    }],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ 
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { 
      model: Category,
      as: 'categories',
    }],
  });
  if (!post) return { status: 404, message: 'Post does not exist' };
  return post;
};

const updateById = async (id, data) => {
  const { error } = schemaUpdate.validate(data);
  if (error) return { status: 400, message: 'Some required fields are missing' };

  const { title, content } = data;

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const updatePost = await getById(id);
  return updatePost;
};

const deletePost = async (id) => {
  const post = await BlogPost.destroy({ where: { id } });
  return post;
};

module.exports = {
  createNewPost,
  getAll,
  getById,
  updateById,
  deletePost,
};
