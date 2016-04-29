'use strict';

require('angular')
require('angular-route')

var app = angular.module('app',
[
  'ngRoute',
  'human',
  'ghost',
  'tab',
])

require('./directives/directives.js')(app)
require('./services/auth.js')(app)
require('./services/simple.js')(app)
require('./services/error.js')(app)

app.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: './templates/login.html'
  })
  .when('/ghosts', {
    templateUrl: './templates/ghost.html'

  })
  .when('/humans', {
    templateUrl: './templates/human.html'
  })
}])
