const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    minlength: 2,
    trim: true,
    required: true,
  },
  id: {
    type: String,
    minlength: 4,
    maxlength: 12,
    trim: true,
    // match: /0-9|a-z/,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  admin: {
    type: Boolean, 
    default: false
  }
});

// User.static('insertUser', (user) => {
//   const user = new this({
//     id: user.id,
//     password: user.password,
//     username: user.username
//   });
//   return user.save();
// });

// User.static('findById', (id) => {
//   return this.find({ id: id });
// });


module.exports = mongoose.model('User', User);