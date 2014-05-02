'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconConnectedGraph', function() {
  return {
    template: '<div></div>',
    restrict: 'A',
    transclude: true,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      scope.lexiconConfidenceThreshold = 10;
      console.log("scopedata", scope.data);
      var firstGlosser = new Glosser({
        pouchname: scope.data.pouchname
      });
      firstGlosser.downloadPrecedenceRules(scope.data.pouchname, "http://localhost:5984/" + scope.data.pouchname + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
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
          dbname: scope.data.pouchname,
          element: document.getElementById("lexicon"),
          dontConnectWordBoundaries: !scope.showWordBoundaries
        });
        scope.data.lexicon = lexicon;
        // lexicon.bindToView();
        var renderFirstGraph = function() {
          var glosserElement = document.getElementById("glosser");
          glosserElement.innerHTML = "";
          var confidenceThreshold = scope.lexiconConfidenceThreshold / 10;
          firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !scope.showWordBoundaries, confidenceThreshold);
        };
        // rerenderIfWordBoundariesChange.push(renderFirstGraph);
        renderFirstGraph();
      });
    }
  };
});
