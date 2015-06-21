(function() {
  'use strict';

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  angular
    .module('fielddbLexiconAngularApp')
    .run(runBlock);

})();