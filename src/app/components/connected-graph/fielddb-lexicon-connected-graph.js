'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconConnectedGraph', function() {
  return {
    template: '<div></div>',
    restrict: 'A',
    transclude: false,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      if (!scope.data || !scope.data.dbname) {
        return;
      }
      scope.lexiconConfidenceThreshold = 10;
      // console.log("scopedata", scope.data);
      var firstGlosser = new Glosser({
        dbname: scope.data.dbname,
        localDocument: document
      });
      firstGlosser.downloadPrecedenceRules(scope.data.dbname,
        "http://localhost:5984/" +
        scope.data.dbname +
        "/_design/lexicon/_view/morphemesPrecedenceContext?group=true&limit=2400",
        function(precedenceRelations) {
          var utterance = firstGlosser.guessUtteranceFromMorphemes({
            utterance: "",
            morphemes: "Kicha-nay-wa-n punqo-ta",
            allomorphs: "",
            gloss: "open-DES-1OM-3SG door-ACC",
            translation: "I feel like opening the door."
          });
          console.log(utterance);
          var lexicon = LexiconFactory({
            precedenceRelations: precedenceRelations,
            dbname: scope.data.dbname,
            element: document.getElementById("lexicon"),
            dontConnectWordBoundaries: !scope.showWordBoundaries
          });
          scope.data.lexicon = lexicon;
          lexicon.bindToView();
          var renderFirstGraph = function() {
            var glosserElement = document.getElementById("glosser");
            glosserElement.innerHTML = "";
            var confidenceThreshold = scope.lexiconConfidenceThreshold / 10;
            firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, false, 0.1);
          };
          // rerenderIfWordBoundariesChange.push(renderFirstGraph);
          renderFirstGraph();
        });
    }
  };
});