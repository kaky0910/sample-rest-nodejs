const UserSchema = require('../models/user');

const userService = () => {
  const getAllUsers = async () => await UserSchema.find();
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);
  const insertUser = async (user) => await UserSchema.create(user);
  const deleteUser = async (deleteCondition) => await UserSchema.deleteOne(deleteCondition);

  return {
    getAllUsers,
    verify,
    insertUser,
    deleteUser
  };
};

module.exports = userService;