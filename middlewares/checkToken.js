const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const checkToken = async (req, res, next) => {
  try {
    const userData = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.userId = userData.id;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Token is expired" });
    console.error(error);
  }
};

module.exports = {
  checkToken,
};
