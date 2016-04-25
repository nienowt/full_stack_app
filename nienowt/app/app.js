(function(){
  angular.module('app',
  [
    'human',
    'ghost',
    'tab'
  ])
  .directive('ghosts', function(){
    return {
      templateUrl: './templates/ghost.html'
    }
  })
  .directive('humans', function(){
    return {
      templateUrl: './templates/human.html'
    }
  })
  .directive('resourceNav', function(){
    return {
      templateUrl: './templates/nav.html'
    }
  })
  .directive('login', function(){
    return {
      templateUrl: './templates/login.html'
    }
  })
  //I forgot that we were doing auth later this week so I tried to do it for this assignment, ignore this bit for now
  .factory('Auth', ['$http','$window', function($http, $window){
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
          token = $window.localStorage.token = res.data.token;
          console.log(token)
          console.log('windo', $window.localStorage.token)
        })
      },
      getToken: function(){
        console.log(token)
        return token
      }

    }
    return auth
  }])
})()
