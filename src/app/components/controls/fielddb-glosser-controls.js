'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconControls', function() {
  return {
    templateUrl: 'views/controls.html',
    restrict: 'A',
    transclude: false,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text('this is the fielddbLexiconControls directive');
    }
  };
});
