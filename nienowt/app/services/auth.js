module.exports = function(app){
  app.factory('Auth', ['$http','$window', function($http, $window){
    var token;
    var auth = {
      createGhost: function(ghost){
        $http.post('http://localhost:3000/pub/new-ghost', ghost)
        .then(function(res){
          console.log(res)
        })
      },
      login: function(ghost){
        $http({
          method:'POST',
          url: 'http://localhost:3000/pub/login',
          headers: {
            'Authorization': 'Basic ' + btoa((ghost.name + ':' + ghost.password))
          }
        }).then(function(res) {
          token = $window.sessionStorage.token = res.data.token;
          console.log(token)
          console.log('sesh', $window.sessionStorage.token)
        })
      },
      getToken: function(){
        console.log(token)
        return token
      }

    }
    return auth
  }])
}
