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

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('MainCtrl', function($scope) {

})

.controller('NavigateCtrl', function($scope, $state) {

  $scope.location = {};
  $scope.location.mode = "Walking";
  $scope.location.origin = "";
  $scope.location.destination = "";

  $scope.setActive = function($event) {
    console.log($scope.currentTarget);
  }

  $scope.sendSMS = function() {
    var msg = $scope.location;

    SMS.sendSMS('+16475593820', msg, function() {
      window.location.href = "#/app/showDirections";
    }, function(e) {
      console.log('Message Failed:' + e);
    });

  }

  // somewhere in your controller
  $scope.options = {
    format: 'hh-mm', // ISO formatted date
    onClose: function(e) {
      // do something when the picker closes
    }
  }
});
