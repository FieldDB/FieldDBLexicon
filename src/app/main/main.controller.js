(function() {
  'use strict';

  angular
    .module('fielddbLexiconAngularApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
   
    $scope.corpus = new FieldDB.Corpus({
      dbname: 'chuj-shared'
    });

  }
})();