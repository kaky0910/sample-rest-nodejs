const bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: 'application log',
  streams: [
    {
      type: 'rotating-file',
      level: 'info',
      period: '1d',
      path: './logs/info/app-info-log.log'            // log INFO and above to stdout
    },
    {
      type: 'rotating-file',
      level: 'error',
      period: '1d',
      path: './logs/error/app-error-log.log'           // log ERROR and above to a file
    }
  ]
});

module.exports = {
  logging: (req, res, next) => {
    // console.log('logging..');
    log.info(reqSerializer(req));
    next();
  },
  errorLogging: (err, req, res, next) => {
    if(err) {
      log.error(reqErrSerializer(err, req));
      if (err.status)
        res.status(err.status).send({ error: err });
      else
        res.status(500).send({ error: err });
    } else {
      next();
    }
  }
};

var reqSerializer = (req) => {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
  }
}

var reqErrSerializer = (err, req) => {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      error: err
    }
  }