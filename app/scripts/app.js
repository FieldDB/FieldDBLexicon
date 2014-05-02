'use strict';

angular
  .module('fielddbLexiconAngularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/sample.html',
        controller: 'LexiconController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
