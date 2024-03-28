const { Sequelize } = require("sequelize");

const db = require("./../models");
const Transaction = db.transaction;

const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.body;
    const transactions = await Transaction.findAll({
      where: {
        user_id: user_id,
      },
      // attributes: {
      //   include: [
      //     [db.sequelize.col(db.category.category_name), "categoryName"],
      //   ],
      // },
      include: {
        model: db.category,
        as: "category",
        where: {
          state: Sequelize.col("category_name"),
        },
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
