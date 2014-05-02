'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconData', function() {
  return {
    templateUrl: 'views/data.html',
    restrict: 'A',
    transclude: true,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text(attrs.corpus);
    }
  };
});
