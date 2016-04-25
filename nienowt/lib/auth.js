'use strict';

let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var decoded;

  try {
    console.log(req.headers)
    var token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, 'arbitrary');
    req.decodedToken = decoded;
    console.log(decoded)
    next();
  }
  catch(e) {
    console.log(e)
    return res.status(400).json({msg: 'ACCESS DENIED'});
  }
};
