'use strict';
/* globals Glosser, LexiconFactory, iLanguageCloud */
angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconConnectedGraph', function() {
  return {
    template: '<section ng-show="corpus.prefs.showGlosserAsGraph" class="fielddb-glosser fielddb-lexicon"></section><section ng-show="corpus.prefs.showLexiconAsList" class="fielddb-lexicon"></section>',
    restrict: 'A',
    // transclude: false,
    scope: {
      corpus: '=json'
    },
    link: function postLink(scope, element) {
      if (!scope.corpus || !scope.corpus.dbname) {
        return;
      }
      // console.log("scopedata", scope.corpus);
      scope.corpus.glosser = new Glosser({
        dbname: scope.corpus.dbname,
        localDocument: document
      });
      scope.corpus.runningStemmer = true;

      scope.corpus.glosser.render = function() {
        var glosserElement = element.find('section')[0];
        glosserElement.innerHTML = '';
        var confidenceRange = scope.corpus.prefs.lexiconConfidenceRange || {
          min: 0.5,
          max: 0.9
        };
        this.visualizePrecedenceRelationsAsForceDirectedGraph(scope.corpus.lexicon, glosserElement, false, confidenceRange);
      };

      scope.corpus.glosser.downloadPrecedenceRules(scope.corpus.dbname,
          'http://localhost:5984/' + scope.corpus.dbname +
          '/_design/lexicon/_view/morphemesPrecedenceContext?group=true&limit=400')
        .then(
          function(precedenceRelations) {
            var lexicon = LexiconFactory({
              precedenceRelations: precedenceRelations,
              dbname: scope.corpus.dbname,
              lexicalEntriesElement: element.find('section')[1],
              dontConnectWordBoundaries: !scope.showWordBoundaries,
              localDOM: document,
              url: scope.corpus.url
            });
            var wordCloud = new iLanguageCloud({
              orthography: 'please show me a word cloud please'
            });
            wordCloud.render();
            // wordCloud.lexicon = lexicon;
            scope.corpus.wordCloud = wordCloud;
            scope.corpus.lexicon = lexicon;

            lexicon.bindToView();

            // rerenderIfWordBoundariesChange.push(scope.corpus.glosser.render);
            scope.corpus.glosser.render();
          },
          function(error) {
            scope.corpus.bug('There was a problem loading the glosser' + error.userFriendlyErrors);
          })
        .fail(function(exception) {
          scope.corpus.bug('There was a problem loading the glosser. Please report this.');
          console.warn(exception.stack);
        });
    }
  };
});