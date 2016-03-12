angular.module('App')
  .controller('HomeController', function($scope, $state, $localStorage, homeFactory) {
    var vm = this;
    vm.summoner = {region: $localStorage.summonerRegion || 'NA'};
    vm.regionList = ['NA', 'BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'OCE', 'RU', 'TR'];

    vm.saveSummonerIGN = function (){
      homeFactory.saveSummonerIGN(vm.summoner);
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
