(function() {
  'use strict';

  angular
    .module('wordCloudCleaner')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
