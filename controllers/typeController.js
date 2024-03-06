const db = require('./../models');
const Type = db.type;

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();

    if (types) {
      return res.status(200).send(types);
    } else {
      res.status(409).send({ error_msg: 'There is no types are stored.' });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

const addType = async (req, res) => {
  try {
    const { type } = req.body;
    const existingType = await Type.findOne({
      where: {
        type: type,
      },
    });

    if (existingType) {
      return res.status(409).send({ message: 'Type is already Exist' });
    }

    const newType = await Type.create({ type: type });
    if (newType) {
      return res.status(201).send({
        message: 'Type Created Successfully..!!',
        type: newType.type,
      });
    } else {
      res.status(409).send({ error_msg: 'Details are not correct' });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = {
  addType,
  getTypes
};
