'use strict';

angular.module('fielddbLexiconAngularApp')
  .directive('fielddbLexiconControls', function () {
    return {
      templateUrl: 'views/controls.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the fielddbLexiconControls directive');
      }
    };
  });
