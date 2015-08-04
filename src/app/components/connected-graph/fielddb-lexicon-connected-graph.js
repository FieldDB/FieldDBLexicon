'use strict';
/* globals FieldDB, Lexicon, iLanguageCloud */
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
      scope.corpus.glosser = scope.corpus.glosser || new FieldDB.Glosser({
        dbname: scope.corpus.dbname,
        localDocument: document
      });
      scope.corpus.runningStemmer = true;
      scope.corpus.lexicon = scope.corpus.lexicon || new FieldDB.Lexicon({
        dbname: scope.corpus.dbname,
        lexicalEntriesElement: element.find('section')[1],
        dontConnectWordBoundaries: !scope.showWordBoundaries,
        localDOM: document
      });

      scope.corpus.lexicon.fetch().then(function(entries) {
        if (!entries.length) {
          scope.corpus.lexicon.popup("I downloaded your lexicon. Are you sure you have data in your " + scope.corpus.title + " corpus?");
          return;
        }
        scope.corpus.glosser.fetch()
          .then(
            function(precedenceRelations) {
              scope.corpus.lexicon.entryRelations = precedenceRelations;
              scope.corpus.lexicon.updateConnectedGraph();

              // var wordCloud = new iLanguageCloud({
              //   orthography: 'please show me a word cloud please'
              // });
              // wordCloud.render();
              // wordCloud.lexicon = lexicon;
              // scope.corpus.wordCloud = wordCloud;

              lexicon.bindToView();

              // rerenderIfWordBoundariesChange.push(scope.corpus.glosser.render);
              scope.corpus.glosser.render();
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
      //   this.visualizePrecedenceRelationsAsForceDirectedGraph(scope.corpus.lexicon, glosserElement, false, confidenceRange);
      // };


    }
  };
});
