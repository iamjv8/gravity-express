var express = require('express');
var router = express.Router();
const { saveUser } = require('./../middlewares/userAuth');
const { signup, login } = require('./../controllers/userController');
const { addType, getTypes } = require('./../controllers/typeController');
const {
  getCategories,
  addCategory,
} = require('../controllers/categoryController');
const {
  getTransactions,
  addTransaction,
} = require('../controllers/transactionController');
const { checkToken } = require('../middlewares/checkToken');

router.post('/signup', saveUser, signup);
router.post('/login', login);

router.get('/type', checkToken, getTypes);
router.post('/type', addType);

router.get('/category', getCategories);
router.post('/category', addCategory);

router.post('/getTransaction', getTransactions);
router.post('/addTransaction', addTransaction);

module.exports = router;
