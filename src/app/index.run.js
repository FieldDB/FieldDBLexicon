(function() {
  'use strict';

  angular
    .module('fielddbLexiconAngularApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
