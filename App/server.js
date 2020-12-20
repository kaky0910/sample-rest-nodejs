var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/v1');
var tokenRoute = require('./routes/v1/token.route');
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors');
var auth = require('./policies/auth.policy');
var { logging, errorLogging } = require('./services/logging.service');
var path = require('path');
var db = require('./db');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var swaggerDefinition = {
  info: { // API informations (required)
    title: 'Rest API Sample Document', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { jwt: [] }
  ],
}

// Options for the swagger docs
var options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ['./routes/v1/*.route.js'],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options)

var app = express();
// console.log('environment::::::', process.env.ENVIRONMENT);

if (process.env.ENVIRONMENT === 'test') {
  require('dotenv').config({ path: path.join(__dirname, '/config/test/.env')})
  // dotenv.config({path: path.join(__dirname, 'config/test/')});
} else {
  require('dotenv').config({ path: path.join(__dirname, '/config/prod/.env')})
}

// app.use(session({

//   store: new RedisStore({
//       client: redis.createClient(6379, 'localhost'),  // redis server config
//       prefix : "session:",                            // redis key prefix
//   }),
//   secret: 'jkkey',                                    // secret key
//   resave: false,
//   saveUninitialized: true,
// }));

app.use('/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use(express.json());

db.connect();
// mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}`, {useNewUrlParser: true})
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch(e => console.error(e));

app.use((req, res, next) => logging(req, res, next));

app.use('/token', tokenRoute);

app.all('/v1/*', (req, res, next) => auth(req, res, next));

app.use('/v1', routes);

app.use('/static', express.static('public'));

app.use((err, req, res, next) => errorLogging(err, req, res, next));

app.listen(`${process.env.SERVICE_PORT}`);
