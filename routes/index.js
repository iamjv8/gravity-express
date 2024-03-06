var express = require('express');
var router = express.Router();
const userAuth = require('./../middlewares/userAuth');
const { signup, login } = require('./../controllers/userController');
const { addType, getTypes } = require('./../controllers/typeController');
const { getCategories, addCategory } = require('../controllers/categoryController');
const { getTransactions, addTransaction } = require('../controllers/transactionController');

router.post('/signup', userAuth.saveUser, signup);
router.post('/login', login);

router.get('/type', getTypes);
router.post('/type', addType);

router.get('/category', getCategories);
router.post('/category', addCategory);

router.post('/getTransaction', getTransactions);
router.post('/addTransaction', addTransaction);

module.exports = router;
