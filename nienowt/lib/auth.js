'use strict';

let jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next){
  var decoded;

  console.log('in auth middle ware: ',req.headers)
  try {

    var token = req.headers.token; ///change to req.headers.token  and send on headers as token: token not auth:token:token
    decoded = jwt.verify(token, 'arbitrary');
    req.headers.decodedToken = decoded;
    console.log(decoded)
    next();
  }
  catch(e) {
    console.log(e)
    return res.status(400).json({msg: 'ACCESS DENIED'});
  }
};
