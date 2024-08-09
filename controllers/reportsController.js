const db = require("./../models");
const Transaction = db.transaction;

const getDashboardStatistics = async (req, res) => {
  let statistics = {
    expense: 0,
    income: 0,
    investment: 0,
    savings: 0,
  };
  try {
    const { user_id } = req.body;
    const transactions = await Transaction.findAll({
      where: {
        userId: user_id,
      },
      include: [
        {
          model: db.category,
          as: "category",
          attributes: ["category_name"],
        },
        {
          model: db.type,
          as: "type",
          attributes: ["type_name"],
        },
      ],
    });
    const transactionsData = transactions.map((element) => {
      element.dataValues.category = element.category.category_name;
      element.dataValues.type = element.type.type_name;
      delete element.dataValues.categoryId;
      switch (element.type.type_name) {
        case "Expense":
          statistics.expense += element.amount;
          break;

        case "Income":
          statistics.income += element.amount;
          break;

        case "Investment":
          statistics.investment += element.amount;
          break;

        case "Saving":
          statistics.savings += element.amount;
          break;

        default:
          break;
      }
      return element;
    });

    if (transactionsData) {
      return res.status(200).send(statistics);
    } else {
      res
        .status(409)
        .send({ error_msg: "There is no transactionsData are stored." });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};
module.exports = {
  getDashboardStatistics,
};
