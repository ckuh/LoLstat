angular.module('App', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'homeFactory',
    'summonerFactory'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        authenticate: false,
        views: {
          '': {
            templateUrl: 'pages/home/home.html'
          }
        }
      })
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
