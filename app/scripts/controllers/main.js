'use strict';

angular.module('fielddbLexiconAngularApp').controller('LexiconController', function($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.corpus = {
    pouchname: "glossersample-quechua"
  };

});
