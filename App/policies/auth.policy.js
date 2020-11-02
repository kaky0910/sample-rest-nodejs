const authService = require('../services/auth.service');

module.exports = (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const h = req.header('Authorization').split(' ');

    if (h.length === 2) {
      const key = h[0];
      const value = h[1];
      if (key === 'Bearer') {
        tokenToVerify = value;
      } else {
        return next({name : 'Authorization Format Error', message: 'Format for Authorization: Bearer [token]', status: 401});
      }
    } else {
      return next({name : 'Authorization Format Error', message: 'Format for Authorization: Bearer [token]', status: 401});
    }
  } else {
    return next({name : 'No Authorization Error', message: 'There is no authorizaion info.', status: 401});
  }

  return authService().verify(tokenToVerify, (err, token) => {
    if (err) return next(err);
    req.token = token;
    return next();
  });
};