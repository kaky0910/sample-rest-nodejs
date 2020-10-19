var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/v1');
var tokenRoute = require('./routes/v1/token.route');
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors');
var auth = require('./policies/auth.policy');

var app = express();
// console.log('environment::::::', process.env.ENVIRONMENT);


// app.use(session({

//   store: new RedisStore({
//       client: redis.createClient(6379, 'localhost'),  // redis server config
//       prefix : "session:",                            // redis key prefix
//   }),
//   secret: 'jkkey',                                    // secret key
//   resave: false,
//   saveUninitialized: true,
// }));

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.use(function (req, res, next) {
  // logging
  console.log('Time:', Date.now(), '  Method:', req.method);
  next();
});

app.use('/token', tokenRoute);

app.all('/v1/*', (req, res, next) => auth(req, res, next));

app.use('/v1', routes);

app.use('/static', express.static('public'));


app.listen(3000);
