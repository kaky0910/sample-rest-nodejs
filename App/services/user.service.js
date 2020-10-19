const UserSchema = require('../models/user');

const userService = () => {
    const getAllUsers = async () => await UserSchema.find();
    const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

    return {
        getAllUsers,
        verify
    };
};

module.exports = userService;