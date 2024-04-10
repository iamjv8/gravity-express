const db = require("./../models");
const Transaction = db.transaction;

const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.body;
    const transactions = await Transaction.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: db.category,
        as: "category",
        attributes: ["category_name"],
      },
    });
    const transactionsData = transactions.map((element) => {
      element.dataValues.category = element.category.category_name;
      delete element.dataValues.category_id;
      return element;
    });
    if (transactionsData) {
      return res.status(200).send(transactionsData);
    } else {
      res
        .status(409)
        .send({ error_msg: "There is no transactions available." });
    }
  } catch (error) {
    return res.send({ Error: error });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { description, amount, category_id, date, type, user_id } = req.body;

    const newTransaction = await Transaction.create({
      description: description,
      amount: amount,
      type: type,
      date: date,
      category_id: category_id,
      user_id: user_id,
    });
    if (newTransaction) {
      return res.status(201).send({
        message: "Transaction added Successfully..!!",
        data: newTransaction,
      });
    } else {
      res.status(409).send({ error_msg: "Details are not correct" });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};
