const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
  try {
    const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    console.log(userData);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkToken,
};
