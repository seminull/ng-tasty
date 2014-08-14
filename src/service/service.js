/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service', [
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects'
]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.filterInt', [])
.factory('filterInt', function() {
  return function (value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }
});

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.debounce', [])
.factory('debounce', [
  '$timeout',
  function($timeout) {
    return function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        $timeout.cancel(timeout);
        timeout = $timeout(function() {
          timeout = null;
          func.apply(context, args);
        }, wait);
      };
    };
  }
]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.setProperty', [])
.factory('setProperty', function() {
  return function(objOne, objTwo, attrname) {
    if (typeof objTwo[attrname] !== 'undefined' && 
        objTwo[attrname] !== null) {
      objOne[attrname] = objTwo[attrname];
    }
    return objOne;
  };
});

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.joinObjects', [])
.factory('joinObjects', [
  'setProperty',
  function(setProperty) {
    return function(objOne, objTwo) {
      for (var attrname in objTwo) {
        setProperty(objOne, objTwo, attrname);
      }
      return objOne;
    };
  }
]);
