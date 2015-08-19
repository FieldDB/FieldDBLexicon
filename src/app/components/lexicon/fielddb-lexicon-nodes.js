'use strict';

angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconNodes', function() {
  return {
    templateUrl: 'app/components/lexicon/nodes.html',
    restrict: 'A',
    transclude: false,
    scope: {
      lexicon: '=json'
    },
    link: function postLink() {
      // element.text('this is the fielddbLexiconNodes directive');
    }
  };
});
