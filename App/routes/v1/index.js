const express = require('express');
const userRoute = require('./user.route');
// const authRoute = require('./auth.route');
// const tokenRoute = require('./token.route');
const dataRoute = require('./data.route');
// const userRoute = require('./user.route');
const errorRoute = require('./error.route');

const router = express.Router();

router.use('/user', userRoute);
// router.use('/auth', authRoute);
// router.use('/token', tokenRoute);
router.use('/data', dataRoute);
// router.use('/user', userRoute);
router.use('/error', errorRoute);       // error발생 테스트용.

module.exports = router;