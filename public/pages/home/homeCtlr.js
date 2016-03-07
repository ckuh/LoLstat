angular.module('App')
  .controller('HomeController', function($scope, $state, homeFactory) {
    var vm = this;

    vm.saveSummonerIGN = function (){
      homeFactory.saveSummonerIGN(vm.summoner.IGN);
      vm.summoner.IGN = "";
      $state.go('summoner');
    }

  });
