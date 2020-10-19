const express = require('express');
const UserSchema = require('../../models/user');
const UserService = require('../../services/user.service');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    let result = await UserService().getAllUsers();
    res.send(result)})
  .post(async (req, res) => {
    const user = new UserSchema({
      id: req.body.id,
      password: req.body.password,
      username: req.body.username
    });
    console.log(user);
    let newUser = await UserSchema.create(user);
    res.send(newUser);
  });

router.route('/:id')
  .get(async (req, res) => {
    let result = await UserSchema.find({id: req.params.id});
    res.send(result)})
  .delete(async (req, res) => {
    // some delete
  })
  .patch(async (req, res) => {
    // update 
  });

module.exports = router;