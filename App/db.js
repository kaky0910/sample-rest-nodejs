var mongoose = require('mongoose');

var connect = (param = '') => new Promise((resolve) => {
  if (param === 'test') {
    mongoose.connect(`mongodb://localhost:27017`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {})
    .catch(e => console.error(e));
  } else {
    mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
  }
  resolve();
});

var disconnect = () => {
    mongoose.disconnect();
};

module.exports = {
    connect, disconnect
};
  


