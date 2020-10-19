const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SomeData = new Schema({
  dataId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  createDate: {
    type: Date,
    // required: true,
  },
  value: {
    type: String,
    required: true,
  },
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


module.exports = mongoose.model('SomeData', SomeData);