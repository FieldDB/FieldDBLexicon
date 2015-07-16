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
      scope.showLexiconConfidenceRange = 10;
      // console.log("scopedata", scope.corpus);
      var firstGlosser = new Glosser({
        dbname: scope.corpus.dbname,
        localDocument: document
      });
      scope.corpus.runningStemmer = true;
      firstGlosser.downloadPrecedenceRules(scope.corpus.dbname,
        'http://localhost:5984/' +
        scope.corpus.dbname +
        '/_design/lexicon/_view/morphemesPrecedenceContext?group=true&limit=400',
        function(precedenceRelations) {
          var utterance = firstGlosser.guessUtteranceFromMorphemes({
            utterance: '',
            morphemes: 'Kicha-nay-wa-n punqo-ta',
            allomorphs: '',
            gloss: 'open-DES-1OM-3SG door-ACC',
            translation: 'I feel like opening the door.'
          });
          console.log(utterance);
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
          // wordCloud.lexicon = lexicon;
          // scope.corpus.wordCloud = wordCloud;
          scope.corpus.lexicon = lexicon;
          
          lexicon.bindToView();
          var renderFirstGraph = function() {
            var glosserElement = element.find('section')[0];
            glosserElement.innerHTML = '';
            var confidenceRange = scope.corpus.prefs.lexiconConfidenceRange || {
              min: 0.5,
              max: 0.9
            };
            firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, false, confidenceRange);
          };
          // rerenderIfWordBoundariesChange.push(renderFirstGraph);
          renderFirstGraph();
        });
    }
  };
});