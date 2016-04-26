(function(){
  angular.module('tab')
  .controller('TabController', ['Auth',function(Auth){
    this.tab = 'landing';
    this.setTab = function(tab){

      if (tab !== 'login' && !Auth.getToken()) return //not great needs double click to enter {all of this is kinna rough}
      this.tab = tab;
    };
    this.active = function(tab){
      return this.tab == tab;
    };
  }])
})()
