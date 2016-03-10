angular.module('App')
  .controller('HomeController', function($scope, $state, homeFactory) {
    var vm = this;
    vm.summoner = {region: 'NA'};
    vm.regionList = ['NA', 'BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'OCE', 'RU', 'TR'];

    vm.saveSummonerIGN = function (){
      homeFactory.saveSummonerIGN(vm.summoner.IGN);
      vm.summoner.IGN = "";
      if($state.current.name === 'summoner'){
        $state.go($state.current, {}, {
          reload: true
        });
      }else {
        $state.go('summoner');
      }
    }

  });
