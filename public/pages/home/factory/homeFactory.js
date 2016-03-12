angular.module('homeFactory', [])
  .factory('homeFactory', function($state, $localStorage) {
    var service = {
      saveSummonerIGN: saveSummonerIGN
    }
    return service;

    function saveSummonerIGN(summonerIGN) {
      $localStorage.summonerIGN = summonerIGN.IGN;
      $localStorage.summonerRegion = summonerIGN.region;;
    }
  })
