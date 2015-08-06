'use strict';
/* globals FieldDB, iLanguageCloud */
angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconConnectedGraph', function() {
  return {
    template: '<i ng-show="corpus.glosser.fetching" class="fa fa-spinner fa-spin fa-5x"></i><section ng-show="corpus.prefs.showGlosserAsGraph" class="fielddb-glosser fielddb-lexicon"></section><i ng-show="corpus.lexicon.fetching" class="fa fa-spinner fa-spin fa-5x"></i><section ng-show="corpus.prefs.showLexiconAsList" class="fielddb-lexicon"></section>',
    restrict: 'A',
    // transclude: false,
    scope: {
      corpus: '=json'
    },
    link: function postLink(scope, element) {
      if (!scope.corpus || !scope.corpus.dbname) {
        return;
      }

      scope.corpus.status = 'Loading lexicon...';
      try{
        if (!scope.$$phase) {
          scope.$digest();
        }
      }catch(e){
        console.log('Scope was already digesting, no need to do it again.');
      }

      // console.log('scopedata', scope.corpus);
      var glosser = new FieldDB.Glosser({
        dbname: scope.corpus.dbname
      });
      FieldDB.Lexicon.maxLexiconSize = 100;
      var lexicon = new FieldDB.Lexicon({
        // dbname: scope.corpus.dbname,
        // lexicalEntriesElement: element.find('section')[1],
        // dontConnectWordBoundaries: !scope.showWordBoundaries,
        localDOM: document
      });

      lexicon.fetch().then(function(entries) {
        if (!entries.length) {
          lexicon.popup('I downloaded your lexicon. Are you sure you have data in your ' + scope.corpus.title + ' corpus?');
          scope.corpus.lexicon = lexicon;
          scope.corpus.glosser = glosser;
          return;
        }
        // TODO use the lexicon precedence relations instead? lexicon.fetchConnectedGraph()
        glosser.fetch()
          .then(
            function(ngramSegmentations) {
              lexicon.entryRelations = ngramSegmentations;
              lexicon.updateConnectedGraph();

              // var wordCloud = new iLanguageCloud({
              //   orthography: 'please show me a word cloud please'
              // });
              // wordCloud.render();
              // wordCloud.lexicon = lexicon;
              // scope.corpus.wordCloud = wordCloud;
              // lexi.updateConnectedGraph();

              lexicon
                .render({
                  lexicalEntriesElement: element.find('section')[1],
                  // igtFields: ["orthography", "utterance", "morphemes","gloss"]
                })
                .visualizeAsForceDirectedGraph({
                  element: document.getElementById('test-force-directed-graph') //element.find('section')[0]
                });

              scope.corpus.lexicon = lexicon;
              scope.corpus.glosser = glosser;
              window.lexicon = lexicon;
              scope.corpus.status = 'Lexicon loaded.';
              if (!scope.$$phase) {
                scope.$digest();
              }

              // rerenderIfWordBoundariesChange.push(scope.corpus.glosser.render);
            },
            function(error) {
              console.warn('There was a problem loading the glosser ' + error.stack);
              scope.corpus.bug('There was a problem loading the glosser ' + error.userFriendlyErrors);
            })
          .fail(function(exception) {
            scope.corpus.bug('There was a problem loading the glosser. Please report this.');
            console.warn(exception.stack);
          });

      });
      // scope.corpus.glosser.render = function() {
      //   var glosserElement = element.find('section')[0];
      //   glosserElement.innerHTML = '';
      //   var confidenceRange = scope.corpus.prefs.lexiconConfidenceRange || {
      //     min: 0.5,
      //     max: 0.9
      //   };
      //   lexicon.visualizePrecedenceRelationsAsForceDirectedGraph(scope.corpus.lexicon, glosserElement, false, confidenceRange);
      // };


    }
  };
});
