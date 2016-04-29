module.exports = function(app){
  app.factory('Auth', ['$http','$window','$location', function($http, $window, $location){
    var token;
    var user;
    var auth = {
      createGhost: function(ghost){
        $http.post('http://localhost:3000/pub/new-ghost', ghost)
        .then(function(res){
          console.log(res)
        })
      },
      login: function(ghost, cb){
        cb || function(){};
        $http({
          method:'GET',
          url: 'http://localhost:3000/pub/login',
          headers: {
            'Authorization': 'Basic ' + btoa((ghost.name + ':' + ghost.password))
          }
        }).then((res) => {
          console.log('made it to .then(res)', res)
          token = $window.localStorage.token = res.data.token;
          user = res.data.id;
          cb(null, res)
        }, (err) => {
          console.log('made it to error')
          cb(err)
        })
      },
      logout(cb){
      token = $window.localStorage.token = null;
      cb && cb()   ///addd logout link /controllerfunction
    },
      getToken: function(){
        console.log(token)
        return token;
      },
      getUser: function(){
        console.log(user)
        return user;
      }
    }
    return auth;
  }])
}
