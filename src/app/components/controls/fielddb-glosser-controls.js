'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconControls', function() {
  return {
    templateUrl: 'app/components/controls/controls.html',
    restrict: 'A',
    // transclude: false,
    // scope: {
    //   // corpus: '=json'
    // },
    link: function postLink() {
      // element.text('this is the fielddbLexiconControls directive');
    }
  };
});
