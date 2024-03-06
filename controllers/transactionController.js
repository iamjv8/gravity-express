const db = require("./../models");
const Transaction = db.transaction;

const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.body;
    const transactions = await Transaction.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (transactions) {
      return res.status(200).send(transactions);
    } else {
      res
        .status(409)
        .send({ error_msg: "There is no transactions available." });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { description, amount, category, type, user_id } = req.body;

    const newTransaction = await Transaction.create({
      description: description,
      amount: amount,
      type: type,
      category: category,
      user_id: user_id,
    });
    if (newTransaction) {
      return res.status(201).send({
        message: "Transaction added Successfully..!!",
        category: newTransaction,
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
