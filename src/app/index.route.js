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
    $stateProvider
      .state("faq", {
        url: "^/faq",
        templateUrl: 'app/components/faq/faq.html'
      });
    $urlRouterProvider.otherwise('/chuj/shared/lexicon');
  }

  angular
    .module('fielddbLexiconAngularApp')
    .config(routeConfig);

})();