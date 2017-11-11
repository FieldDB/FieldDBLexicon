(function() {
  'use strict';

  angular
    .module('fielddbLexiconAngularApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {

    $scope.corpus = {
      pouchname: 'glossersample-quechua'
    };

    // new ILanguageCloud({orthography: 'A cloud is a visible mass ...'}).render();

  }
})();
