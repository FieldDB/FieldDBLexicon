(function() {
  'use strict';
  /* globals FieldDB */

  /** @ngInject */
  var MainController = function($scope, $rootScope) {
    console.log('Loading ', $rootScope.$stateParams);


    if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application) {

      FieldDB.FieldDBObject.application.brand = 'Lexicon Browser';
      FieldDB.FieldDBObject.application.website = FieldDB.FieldDBObject.application.basePathname;

      FieldDB.FieldDBObject.application.search = FieldDB.FieldDBObject.application.search || new FieldDB.Search();
      FieldDB.FieldDBObject.application.search.search = function(filterString) {
        this.prepareDataListForSearchQuery(filterString);
        if ($scope.corpus && $scope.corpus.lexicon && $scope.corpus.lexicon.length && typeof $scope.corpus.lexicon.find === 'function') {
          FieldDB.FieldDBObject.application.search.datalist.docs = $scope.corpus.lexicon.find('headword', filterString, 'fuzzy');
        }
      };

      if ($rootScope.$stateParams && $rootScope.$stateParams.lexicalentry) {
        FieldDB.FieldDBObject.application.search.searchQuery = $rootScope.$stateParams.lexicalentry;
        FieldDB.FieldDBObject.application.search.search(FieldDB.FieldDBObject.application.search.searchQuery);
      }

      var loadingPromise = FieldDB.FieldDBObject.application.processRouteParams($rootScope.$stateParams);
      if (!FieldDB.FieldDBObject.application.corpus) {
        console.warn('Corpus wasnt loadable from route params', $rootScope.$stateParams);
        return;
      }
      $scope.corpus = FieldDB.FieldDBObject.application.corpus;
      //  || new FieldDB.Corpus({
      //   dbname: 'chuj-shared'
      // });
      $scope.corpus.prefs = $scope.corpus.prefs || {};
      $scope.corpus.prefs.autoSaveAndReTrain = $scope.corpus.prefs.autoSaveAndReTrain || false;
      $scope.corpus.prefs.showGlosserAsGraph = $scope.corpus.prefs.showGlosserAsGraph || false;
      $scope.corpus.prefs.showLexiconAsList = $scope.corpus.prefs.showLexiconAsList || false;
      $scope.corpus.prefs.maxLexiconSize = $scope.corpus.prefs.maxLexiconSize || FieldDB.Lexicon.maxLexiconSize;
      $scope.corpus.prefs.showGlosserAsMorphemicTemplate = $scope.corpus.prefs.showGlosserAsMorphemicTemplate || true;
      $scope.corpus.prefs.showLexiconConfidenceRange = $scope.corpus.prefs.showLexiconConfidenceRange || {
        min: 0.3,
        max: 1
      };




      if (loadingPromise && typeof loadingPromise.then === 'function') {
        loadingPromise.then(function(success) {
          console.log('Corpus was loaded', success);
          if ($scope.corpus.error) {
            $scope.corpus.popup($scope.corpus.error);
          }
        }, function(reason) {
          console.log('Corpus wasn\'t loaded', reason);
          $scope.corpus.popup($scope.corpus.error);
        }).fail(function(exception) {
          console.log(exception.stack);
          $scope.corpus.bug($scope.corpus.status || 'There was a problem loading the corpus details. ');
        });
      }
      $scope.corpus.retrainLexicon = $scope.corpus.retrainLexicon || function() {
        console.log('Refresh lexicon');
        $scope.corpus.todo('Refresh lexicon');
      };
    }
  };

  angular
    .module('fielddbLexiconAngularApp')
    .controller('MainController', MainController);
})();
