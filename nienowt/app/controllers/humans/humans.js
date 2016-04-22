(function(){
  angular.module('human')
  .controller('HumanController', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/humans';
    this.humans = ['human'];
    this.editShow = 'new';
    this.newHuman = {};
    this.editconfirmation;
    this.changedHuman = {};
    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };

    this.getHumans = function() {
      $http.get(mainRoute)
      .then((results) => {
        this.humans = results.data;
      },(err) => {
        if (err) console.log(err);
      });
    };
    this.createHuman = function(human) {
      $http.post(mainRoute, human)
      .then(() => {
        this.humans.push(human);
        this.newHuman = {};
      });
    };
    this.editHuman = function(human){
      if (!this.editConfirmation) return this.editConfirmation = true;
      $http.put(mainRoute + '/' + human._id, this.changedHuman)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
        this.humans.push(this.changedHuman);
        this.editShow = 'new';
      });
    };
    this.removeHuman = function(human){
      if (!this.editConfirmation) return this.editConfirmation = true;
      $http.delete(mainRoute + '/' + human._id)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
        this.editShow = 'new';
      });
    };
    this.reset = function(){
      this.editShow = 'new';
      this.changedHuman = {};
      return this.editConfirmation = false;
    };
  }]);
})()