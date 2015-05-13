angular.module('polaris.services', [])

.factory('DirectionsFactory', function() {

  var directions = "";
  var listener = null;

  return {

    attachListener: function(smsListener) {
      listener = smsListener;
    },

    isAttachedListener: function() {
      return (listener !== null);
    },

    getDirections: function() {
      return !directions.length ? [] : directions
        .split(/-(.+)?/)[1]
        .replace('(', '')
        .replace(')', '')
        .split(',');
    },

    reset: function() {
      directions = "";
    },

    addDirections: function(smsBody) {
      directions += smsBody;
    }

  }

});