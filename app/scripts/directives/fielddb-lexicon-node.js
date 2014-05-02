'use strict';

angular.module('fielddbLexiconAngularApp')
  .directive('fielddbLexiconNode', function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.text('fielddbLexiconNode');
      }
    };
  });
