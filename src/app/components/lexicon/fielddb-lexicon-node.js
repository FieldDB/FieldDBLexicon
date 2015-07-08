'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconNode', function() {
  return {
    templateUrl: 'app/components/lexicon/node.html',
    restrict: 'A',
    transclude: false,
    scope: {
      lexicalEntry: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text('fielddbLexiconNode');
    }
  };
});
