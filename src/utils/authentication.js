const postService = require('../service/postService');

const userAuthentication = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const post = await postService.getById(id);
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = userAuthentication;
