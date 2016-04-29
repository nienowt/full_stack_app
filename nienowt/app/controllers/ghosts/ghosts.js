(function(){
  angular.module('ghost')
  .controller('GhostController',['$http','$location', '$window','Auth','ResourceServ','ErrorService', function($http, $location, $window, Auth, ResourceServ, ErrorService) {
    var ghostResource = ResourceServ('ghosts')
    this.ghosts = ['ghost'];
    this.editShow = 'new';
    this.error = ErrorService();
    this.editConfirmation;
    this.newGhost = {};
    this.changedGhost = {};


    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };

    this.getGhosts = ghostResource.getAll()
      .then((results) => {
        this.ghosts = results.data;
        console.log(results.data);
      },(err) => {
        if (err) console.log(err);
        $location.path('/')
      });

    this.createGhost = function(ghost){
      Auth.createGhost(ghost)
    }

    this.login = function(ghost){
      Auth.login(ghost, (err, res) => {
        console.log('err res',err, res)
        if(err) return this.error = ErrorService('Incorrect Username and/or Password')
        $location.path('/ghosts')
        this.error = 'null'
      })
    }

    this.editGhost = function(ghost){
      if (!this.editConfirmation) return this.editConfirmation = true;
      ghostResource.edit(ghost, this.changedGhost)
      .then((res) => {
        console.log(res.data)
        if(res.data == 'DENIED') {
          this.editShow = 'new'
          this.changedGhost = {}
          return
        }
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
        this.ghosts.push(this.changedGhost.ghost);
        this.editShow = 'new';
      });
    };

    this.removeGhost = function(ghost){
      if (!this.editConfirmation) return this.editConfirmation = true;
      ghostResource.remove(ghost)
      .then((res) => {
        console.log(res)
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
        this.editShow = 'new';
      });
    };
              // doesnt work?
    this.reset = function(){
      this.editShow = 'new';
      this.changedGhost = {};
      return this.editConfirmation = false;
    };
  }])
})()
