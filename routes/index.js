var express = require("express");
var router = express.Router();
const { saveUser } = require("./../middlewares/userAuth");
const { signup, login } = require("./../controllers/userController");
const { addType, getTypes } = require("./../controllers/typeController");
const {
  getCategories,
  addCategory,
} = require("../controllers/categoryController");
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transactionController");
const { checkToken } = require("../middlewares/checkToken");

router.post("/signup", saveUser, signup);
router.post("/login", login);

router.get("/type", checkToken, getTypes);
router.post("/type", checkToken, addType);

router.get("/category", checkToken, getCategories);
router.post("/category", checkToken, addCategory);

router.post("/getTransaction", checkToken, getTransactions);
router.post("/addTransaction", checkToken, addTransaction);

module.exports = router;
