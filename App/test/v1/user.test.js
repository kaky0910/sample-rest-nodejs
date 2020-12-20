const userService = require('../../services/user.service')();
var assert = require('assert');
var should = require('should');
var db = require('../../db');
var UserSchema = require('../../models/user');
var uuid = require('uuid4');

beforeEach(async () => {
    await db.connect('test');
});

describe('User Service Test', () => {
  describe('#GetAllUsers', () => {
    it('should return users Array', async () => {
      let users = await userService.getAllUsers();
      users.should.Array();
    });
  });

  describe('#InsertUser', () => {
    it('should return user object without err', async () => {
      let user = await userService.insertUser(new UserSchema({
        id: uuid().substr(0,12),
        password: '1234',
        username: 'test'
      }));
      user.should.Object();
    });
  });

  describe('#DeleteUser', () => {
    it('should return user object without err', async () => {
      let user
    });
  });
});

afterEach(async () => {
  db.disconnect();
});