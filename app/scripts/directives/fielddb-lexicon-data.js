'use strict';

angular.module('fielddbLexiconAngularApp')
  .directive('fielddbLexiconData', function () {
    return {
      templateUrl: 'views/data.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.data = attrs.corpus
        // element.text(attrs.corpus);
      }
    };
  });
