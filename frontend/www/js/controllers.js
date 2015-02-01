angular.module('polaris.controllers', [])

.controller('AppCtrl', function($scope, $location, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
  };
})


.controller('MainCtrl', function($scope) {

})

.controller('NavigateCtrl', function($scope, $location) {

  $scope.location = {};
  $scope.location.mode = "Walking";
  $scope.location.origin = "";
  $scope.location.destination = "";
  $scope.test = "TEST";
  $scope.directions = "hello world";

  $scope.setActive = function($event) {
    console.log($scope.currentTarget);
  }
// 16476910576
// 16475593820

  $scope.sendSMS = function() {
    SMS.sendSMS('+16475593820', $scope.location, function() {
    }, function(e) {
      console.log('Message Failed:' + e);
    });

    $location.path('/app/showDirections');
  }

  // somewhere in your controller
  $scope.options = {
    format: 'hh-mm', // ISO formatted date
    onClose: function(e) {
      // do something when the picker closes
    }
  }

})

.controller('DirectionsCtrl', function($scope) {

  var filter = {};
  filter.box = 'inbox';
  filter.address = '+16475593820';
  filter.maxCount = 1;

  $scope.directions = "";

  SMS.listSMS(filter, function(data) {
    $scope.directions = data[0].body
      .split(/-(.+)?/)[1]
      .replace('(','')
      .replace(')','')
      .split(',');
  });

});
