angular.module('App', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'homeFactory'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('summoner', {
        url: '/summoner',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'pages/summoner/summoner.html'
          }
        }
      })

    $urlRouterProvider
      .otherwise('/');
  })

  .run(function($rootScope, $state, $localStorage) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
      if (!to.authenticate) {
        return;
      };
      e.preventDefault();

      if($localStorage.summonerIGN) {
        to.authenticate = false;
        $state.go(to.name);
      } else {
        $state.go('home');
      }
    });
  })
