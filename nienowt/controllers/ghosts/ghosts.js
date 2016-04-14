(function(){
  angular.module('ghost')
  .controller('GhostController',['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/ghosts';
    this.ghosts = ['ghost'];
    this.editShow = 'new';
    this.editConfirmation;
    this.newGhost = {};
    this.changedGhost = {};

    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };

    this.getGhosts = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.ghosts = results.data;
        console.log(results.data);
      },(err) => {
        if (err) console.log(err);
      });
    };

    this.createGhost = function(ghost) {
      $http.post('http://localhost:3000/pub/new-ghost', ghost)
      .then(() => {
        this.ghosts.push(ghost);
        this.newGhost = {};
      });
    };

    this.editGhost = function(ghost){
      if (!this.editConfirmation) return this.editConfirmation = true;
      $http.put(mainRoute + '/' + ghost._id, this.changedGhost)
      .then(() => {
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
        this.ghosts.push(this.changedGhost.ghost);
        this.editShow = 'new';
      });
    };

    this.removeGhost = function(ghost){
      if (!this.editConfirmation) return this.editConfirmation = true;
      $http.delete(mainRoute + '/' + ghost._id)
      .then(() => {
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
