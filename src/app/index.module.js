(function() {
	'use strict';
	FieldDB.Database.prototype.BASE_DB_URL = 'http://localhost:5984';
	FieldDB.Database.prototype.BASE_AUTH_URL = 'https://authdev.lingsync.org';

	angular.module('fielddbLexiconAngularApp', [
		'ngAnimate',
		'ngCookies',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		// 'mgcrea.ngStrap',
		'WordCloudApp',
		'fielddbAngular'
	]);

})();