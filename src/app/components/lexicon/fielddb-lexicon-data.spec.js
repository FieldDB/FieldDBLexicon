'use strict';

describe('Directive: fielddbLexiconData', function () {

  // load the directive's module
  beforeEach(module('fielddbLexiconAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fielddb-lexicon-data></fielddb-lexicon-data>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fielddbLexiconData directive');
  }));
});
