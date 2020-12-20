const express = require('express');
const SomeDataSchema = require('../../models/someData');

const router = express.Router();

var session = require('express-session');

router.route('/')
  .get(async (req, res) => {
    let result = await SomeDataSchema.find();
    res.send(result)});

router.route('/datas')
  .post((req, res) => {
    
  });

  module.exports = router;