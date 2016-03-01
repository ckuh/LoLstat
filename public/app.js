angular.module('App', [
    'ui.router',
    'homeFactory'
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

    $urlRouterProvider
      .otherwise('/');
  })
