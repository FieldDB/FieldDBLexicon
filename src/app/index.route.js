(function() {
  'use strict';

  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("lexicon", {
        url: "^/:team/:corpusidentifier/lexicon",
        templateUrl: 'app/main/lexicon-browser.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
    $urlRouterProvider.otherwise('/chuj/shared/lexicon');
  }

  angular
    .module('fielddbLexiconAngularApp')
    .config(routeConfig);

})();