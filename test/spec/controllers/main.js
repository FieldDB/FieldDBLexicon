'use strict';

describe('Controller: LexiconController', function() {

  // load the controller's module
  beforeEach(module('fielddbLexiconAngularApp'));

  var LexiconController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    LexiconController = $controller('LexiconController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
