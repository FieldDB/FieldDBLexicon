'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconData', function() {
  return {
    templateUrl: 'app/components/lexicon/data.html',
    restrict: 'A',
    transclude: false,
    scope: {
      data: '=json'
    },
    link: function postLink() {
      // element.text(attrs.corpus);
    }
  };
});
