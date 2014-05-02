'use strict';

angular.module('fielddbLexiconAngularApp').controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.corpus = {
    	pouchname: "glossersample-quechua"
    };
    var firstGlosser = new Glosser({
      pouchname: $scope.corpus.pouchname
    });
    firstGlosser.downloadPrecedenceRules($scope.corpus.pouchname, "http://localhost:5984/" + $scope.corpus.pouchname + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
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
        dbname: $scope.corpus.pouchname,
        element: document.getElementById("lexicon"),
        dontConnectWordBoundaries: !$scope.showWordBoundaries
      });
      $scope.corpus.lexicon = lexicon;
      // lexicon.bindToView();
      var renderFirstGraph = function() {
        var glosserElement = document.getElementById("glosser");
        glosserElement.innerHTML = "";
        var confidenceThreshold = document.getElementById("lexiconConfidenceThreshold").value /10;
        firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !$scope.showWordBoundaries, confidenceThreshold);
      };
      // rerenderIfWordBoundariesChange.push(renderFirstGraph);
      renderFirstGraph();
    });
  });
