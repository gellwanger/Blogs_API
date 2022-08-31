const postService = require('../service/postService');

const createNewPost = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const data = req.body;
    const newPost = await postService.createNewPost(userId, data);
    if (newPost.status) next(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const posts = await postService.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getById(id);
    if (post.status) next(post);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatePost = await postService.updateById(id, data);
    if (updatePost.status) return next(updatePost);
    return res.status(200).json(updatePost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);
  return res.status(204).end();
};

module.exports = {
  createNewPost,
  getAll,
  getById,
  updateById,
  deletePost,
};
