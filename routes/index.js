var express = require('express');
var router = express.Router();
var userModel = require('../model/users')
var friendModel = require('./../model/userFriend')
const { QueryTypes } = require('sequelize');
var sequelize = require('./../model/connection');
const User = require('../model/users');

/* GET user's Friend listing. */
router.get('/users', async function (req, res) {
  try {
    var user = await userModel.findAndCountAll({ where: { }, include: [{ model: friendModel, include: [{ model: User }] }], limit: 10, offset: (parseInt(req.query.currentPage) * 10) || 0 })
    if (user) {
      res.status(200).json({ user: user })
    } else {
      res.status(404).json({ message: 'User Not Found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', data: error })
  }
})

module.exports = router;
