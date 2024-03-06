const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./../models");
const User = db.users;

const signup = async (req, res) => {
  try {
    const { display_name, mobile, password } = req.body;
    const data = {
      display_name: display_name,
      mobile: mobile,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      delete user.id;
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return res.status(201).send({
        message: "User Created Successfully..!!",
        token: token,
        user: user,
      });
    } else {
      res.status(409).send({ error_msg: "Details are not correct" });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({
      where: {
        mobile: mobile,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).send({
          message: "User Login Successfully..!!",
          token: token,
        });
      } else {
        res.status(401).send({ error_msg: "Authentication Failed" });
      }
    } else {
      res.status(401).send({ error_msg: "Authentication Failed" });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = {
  signup,
  login,
};
