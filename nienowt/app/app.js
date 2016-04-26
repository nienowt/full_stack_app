  var app = angular.module('app',
  [
    'human',
    'ghost',
    'tab',
  ])

  require('./directives/directives.js')(app)
  require('./services/auth.js')(app)
  require('./services/simple.js')(app)
