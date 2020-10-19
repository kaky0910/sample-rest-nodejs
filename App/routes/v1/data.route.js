const express = require('express');
const SomeDataSchema = require('../../models/someData');

const router = express.Router();

var session = require('express-session');

router.route('/')
  .get(async (req, res) => {
    let result = await SomeDataSchema.find();
    res.send(result)});

router.route('/getDatas')
  .post((req, res) => {
    let token = uuid4();
    // auth check
    let id = req.body.id;
    let pwd = req.body.password;
    
  });

  module.exports = router;