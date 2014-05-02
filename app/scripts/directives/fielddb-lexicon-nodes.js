'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconNodes', function() {
  return {
    templateUrl: 'views/nodes.html',
    restrict: 'A',
    transclude: true,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text('this is the fielddbLexiconNodes directive');
    }
  };
});
