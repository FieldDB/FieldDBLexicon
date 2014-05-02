'use strict';

angular.module('fielddbLexiconAngularApp')
  .directive('fielddbLexiconConnectedGraph', function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.text('fielddbLexiconConnectedGraph');
      }
    };
  });
