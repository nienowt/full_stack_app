module.exports = function(app){
  app.directive('ghosts', function(){
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
}
