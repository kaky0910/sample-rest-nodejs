const express = require('express');
const uuid4 = require('uuid4');
const jwt = require('jsonwebtoken');
const authService = require('../../services/auth.service');

const router = express.Router();

var session = require('express-session');

router.route('/')
  .post(async (req, res) => {

    let result = await UserSchema.find({id: req.params.id, password: req.body.password});
    if (!result) {

    }
    let token = authService().issue({id: req.params.id});
    res.send(token);
  })
  .get((req, res) => {
    let token = authService().issue({id: 'randomkey'});
    res.send(token);
  });

  module.exports = router;