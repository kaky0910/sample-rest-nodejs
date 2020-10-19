const express = require('express');

const router = express.Router();

var session = require('express-session');

// router.route('/login')
//   .post((req, res) => {

//   });

router.route('/session')
  .get((req, res) => {
    console.log(req.session);
    if (req.session.key) {
        console.log('req.session.key : ', req.session.key);
    }
    res.send(req.session);
  });

// router.route('/sessionLogin/:id')
//   .get((req, res) => {
//     req.session.key = req.params.id;
//     req.session.createdTime = Date.now();
//     console.log('session saved || ', req.session.key);
//     res.send('session saved'+ req.session.id);
//   });

// router.route('/logout')
//   .get((req, res) => {
//     req.session.destroy(err => {
//       if (err) {
//         console.log(err);
//         res.send('err');
//       } else {
//         res.send('logout!');
//       }
//     });
//   });

router.route('/getToken')
  .post((req, res) => {
    // auth check
    let id = req.body.id;
    let pwd = req.body.password;
    
  });

module.exports = router;