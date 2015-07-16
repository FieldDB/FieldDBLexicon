(function() {
  'use strict';

  angular
    .module('fielddbLexiconAngularApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {

    $scope.corpus = new FieldDB.Corpus({
      dbname: 'chuj-shared',
      prefs: {
        autoSaveAndReTrain: false,
        showGlosserAsGraph: true,
        showLexiconAsList: true,
        graphWordBoundaries: true,
        showLexiconConfidenceRange: 3
      }
    });
    if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application) {
      FieldDB.FieldDBObject.application.corpus = $scope.corpus;
    }
    $scope.corpus.retrainLexicon = $scope.corpus.retrainLexicon || function() {
      console.log("Refresh lexicon");
      $scope.corpus.todo("Refresh lexicon");
    };
  }
})();