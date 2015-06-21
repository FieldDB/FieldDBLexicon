'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconNodes', function() {
  return {
    templateUrl: 'app/components/lexicon/nodes.html',
    restrict: 'A',
    transclude: false,
    scope: {
      data: '=json'
    },
    link: function postLink(scope, element, attrs) {
      // element.text('this is the fielddbLexiconNodes directive');
    }
  };
});
