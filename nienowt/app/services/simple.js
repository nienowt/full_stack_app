module.exports = function(app){
  app.factory('ResourceServ', ['$http','$window','Auth', function($http,$window, Auth){
    var mainRoute = 'http://localhost:3000/api/'
    function Resource(name){
      this.resource = name;
    }

    Resource.prototype.call = function(method, params, data){
      var id = params || '';
      return $http({
        method: method,
        url: mainRoute + this.resource + '/' + id,
        headers: {
          'token': $window.localStorage.token || Auth.getToken()
        },
        data: data || null
      })
    }

    Resource.prototype.getAll = function(){
      return this.call('GET')
    }

    Resource.prototype.create = function(resource){
      return this.call("POST", '', resource)
    }

    Resource.prototype.edit = function(resource, edits){
      return this.call('PUT', resource._id, edits)
    }

    Resource.prototype.remove = function(resource){
      return this.call('DELETE',resource._id)
    }

    return function(name){
      return new Resource(name)
    }
  }])
}
