angular.module('summonerFactory', [])
  .factory('summonerFactory', function($state, $localStorage) {
    var service = {
      averageStats: averageStats
    }
    return service;

    function averageStats(stats, championList) {
      
      debugger;
    }

  })
