const express = require('express');
const UserSchema = require('../../models/user');
const UserService = require('../../services/user.service');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Information service
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - content
 *     properties:
 *       id:
 *         type: string
 *         description: ID
 *       password:
 *         type: string
 *         description: password
 *       username:
 *         type: string
 *         description: 사용자 명
 */

/**
 * @swagger
 * /v1/user:
 *   get:
 *     summary: Returns user list
 *     tags: [User]
 *     responses:
 *       200:
 *         description: user list
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *   post:
 *     summary: register new user information
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: body
 *         description: 가입 ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         description: password
 *         required: true
 *         schema:
 *           type: string
 *       - name: username
 *         in: body
 *         description: 사용자명
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: user list
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */
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

    let newUser = await UserService.insertUser(user);
    res.send(newUser);
  });

router.route('/:id')
  .get(async (req, res) => {
    let result = await UserSchema.find({id: req.params.id});
    res.send(result);})
  .delete(async (req, res) => {
    let user = await UserSchema.find({id: req.params.id, password: req.params.password});

    let result = UserSchema.deleteOne(user);
    res.send(result);})
  .patch(async (req, res) => {
    // update 
  });

module.exports = router;