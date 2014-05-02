'use strict';

describe('Directive: fielddbLexiconNode', function () {

  // load the directive's module
  beforeEach(module('fielddbLexiconAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fielddb-lexicon-node></fielddb-lexicon-node>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fielddbLexiconNode directive');
  }));
});
