'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconData', function() {
  return {
    templateUrl: 'app/components/lexicon/data.html',
    restrict: 'A',
    transclude: false,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text(attrs.corpus);
    }
  };
});
