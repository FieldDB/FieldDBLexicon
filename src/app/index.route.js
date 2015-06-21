(function() {
  'use strict';

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular
    .module('fielddbLexiconAngularApp')
    .config(routeConfig);

})();