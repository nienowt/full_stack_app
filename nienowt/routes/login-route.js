'use strict';

let Ghost = require(__dirname + '/../models/ghost-model');
let Powers = require(__dirname + '/../models/powers-model');

module.exports  = (publicRouter) => {

  publicRouter.route('/new-ghost')
    .post((req, res) => {
      // var based = req.headers.authorization.split(' ')[1];
      // var authArr = new Buffer(based, 'base64').toString().split(':');
      var newPowers = new Powers(req.body.powers);
      newPowers.save((err) => {
        if (err) res.send('powers not recieved yo');
        var newGhost = new Ghost({
          // name: authArr[0],
          name: req.body.name,
          password:req.body.password,
          isEvil: req.body.isEvil,
          numEyes: req.body.numEyes,
          powers: newPowers._id
          // password: authArr[1]
        });
        newGhost.save((err, ghost) => {
          if (!ghost) {
            console.log(err);
            res.write('Name Taken');
            return res.end();
          }
          if (ghost){
            res.write('Ghost Saved');
            return res.end();
          }
        });
      });
    });

  publicRouter.route('/login')
    .get((req, res) => {
      var based = req.headers.authorization.split(' ')[1];''
      var authArr = new Buffer(based, 'base64').toString().split(':');
      Ghost.findOne({name: authArr[0]}, (err, ghost) => {
        if (err || !ghost) {
          console.log(err);
          return res.status(401).json({msg:'Error'});
        }
        var valid = ghost.compareHash(authArr[1]);
        if (!valid) {
          return res.status(401).json({msg:'Invalid credentials'});;
        } else {
          res.json({token: ghost.genToken(), id:ghost._id});
          res.end();
        }
      });
    });
};
