const express = require('express');
const db = require('./../models');

const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const userMobile = await User.findOne({
      where: {
        mobile: req.body.mobile,
      },
    });
    if (userMobile) {
      return res.status(409).send({message: 'User is already Exist'});
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveUser,
};
