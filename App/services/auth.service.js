const jwt = require('jsonwebtoken');
const secret = 'process.env.JWTSECRET';

const authService = () => {
    const issue = (payload) => jwt.sign(payload, secret, {expiresIn: '1d'});
    const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

    return {
        issue,
        verify
    };
};

module.exports = authService;