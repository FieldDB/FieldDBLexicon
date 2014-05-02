'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconNode', function() {
  return {
    template: '<div></div>',
    restrict: 'A',
    transclude: true,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      element.text('fielddbLexiconNode');
    }
  };
});
