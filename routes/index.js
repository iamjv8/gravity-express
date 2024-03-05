var express = require('express');
const userRouter = require('./users');

var router = express.Router();

router.use('/users', userRouter);

module.exports = router;
