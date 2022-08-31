const loginService = require('../service/loginService');

const OK_STATUS = 200;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);

    if (token.status) {
      next(token);
    }

    return res.status(OK_STATUS).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
