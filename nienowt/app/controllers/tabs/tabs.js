(function(){
  angular.module('tab')
  .controller('TabController', function(){
    this.tab = 'landing';
    this.setTab = function(tab){
      this.tab = tab;
    };
    this.active = function(tab){
      return this.tab == tab;
    };
  })
})()
