const db = require("./../models");
const Type = db.type;

const addType = (req, res) => {
  try {
    const { type } = req.body;
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = {
  addType,
};
