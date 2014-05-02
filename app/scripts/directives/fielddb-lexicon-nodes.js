'use strict';

angular.module('fielddbLexiconAngularApp')
  .directive('fielddbLexiconNodes', function () {
    return {
      templateUrl: 'views/nodes.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the fielddbLexiconNodes directive');
      }
    };
  });
