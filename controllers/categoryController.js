const db = require("./../models");
const Category = db.category;

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (categories) {
      return res.status(200).send(categories);
    } else {
      res.status(409).send({ error_msg: "There is no categories are stored." });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

const addCategory = async (req, res) => {
  try {
    const { category_name, type, icon } = req.body;
    const existingCategory = await Category.findOne({
      where: {
        category_name: category_name,
      },
    });

    if (existingCategory) {
      return res.status(409).send({ message: "Category is already Exist" });
    }

    const newCategory = await Category.create({
      category_name: category_name,
      type: type,
      icon: icon,
    });
    if (newCategory) {
      return res.status(201).send({
        message: "Category Created Successfully..!!",
        category: newCategory,
      });
    } else {
      res.status(409).send({ error_msg: "Details are not correct" });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
