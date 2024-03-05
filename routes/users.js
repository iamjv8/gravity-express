var express = require('express');
var router = express.Router();
const userAuth = require('./../middlewares/userAuth');
const { signup, login } = require('./../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('Logged');
  res.send({ message: 'Welcome to NodeJS' });
});

router.post('/signup', userAuth.saveUser, signup);
router.post('/login', login);

module.exports = router;
