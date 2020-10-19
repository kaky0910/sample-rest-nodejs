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
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }
  } else {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }

  return authService().verify(tokenToVerify, (err, token) => {
    if (err) return res.status(401).json({ err });
    req.token = token;
    return next();
  });
};