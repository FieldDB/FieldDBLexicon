(function() {
  'use strict';
  /* globals FieldDB */
  
  var routeConfig = function($stateProvider, $urlRouterProvider) {

    var passStateParamsController = function($stateParams) {
      console.log('Loading ', $stateParams);
      var paramsChanged = false;
      if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application) {
        var fieldDBApp = FieldDB.FieldDBObject.application;
        if (!fieldDBApp.routeParams) {
          paramsChanged = true;
        } else {
          for (var param in $stateParams) {
            if ($stateParams.hasOwnProperty(param) && fieldDBApp.routeParams[param] !== $stateParams[param]) {
              paramsChanged = true;
            }
          }
        }
        if (paramsChanged) {
          fieldDBApp.processRouteParams($stateParams);
          fieldDBApp.debug(fieldDBApp.routeParams);
        }
      }
    };

    $stateProvider
      .state('lexicon.lexicalEntry', {
        url: '^/:team/:corpusidentifier/lexicon/:lexicalentry',
        templateUrl: 'app/main/lexicon-browser.html',
        controller: passStateParamsController
      });
    $stateProvider
      .state('lexicon', {
        url: '^/:team/:corpusidentifier/lexicon',
        templateUrl: 'app/main/lexicon-browser.html',
        controller: passStateParamsController
      });
    $stateProvider
      .state('faq', {
        url: '^/faq',
        templateUrl: 'app/components/faq/faq.html'
      });
    $urlRouterProvider.otherwise('/chuj/shared/lexicon');
  };

  angular
    .module('fielddbLexiconAngularApp')
    .config(routeConfig);

})();
