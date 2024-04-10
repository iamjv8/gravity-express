const db = require("./../models");
const Transaction = db.transaction;

const getDashboardStatistics = async (req, res) => {
  try {
    const { user_id } = req.body;
    const transactions = await Transaction.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: db.category,
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
        .send({ error_msg: "There is no transactionsData are stored." });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};
module.exports = {
  getDashboardStatistics,
};
