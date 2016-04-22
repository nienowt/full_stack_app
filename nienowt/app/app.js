(function(){
  angular.module('app',
  [
    'human',
    'ghost',
    'tab'
  ])
  .directive('ghosts', function(){
    console.log()
    return {
      templateUrl: './templates/ghost.html'
    }
  })
  .directive('humans', function(){
    console.log()
    return {
      templateUrl: './templates/human.html'
    }
  })
  .factory('Auth', ['$http', function($http){
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
          token = res.data.token;
          console.log(token)
        })
      }

    }
    return auth
  }])
})()
