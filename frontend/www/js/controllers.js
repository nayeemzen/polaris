angular.module('starter.controllers', [])

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


.controller('mainCtrl', function($scope) {

})

.controller('navigateCtrl', function($scope, $state) {
  
  $scope.origin ='171 Winter Gardens Trail, Toronto, ON';
  $scope.destination = '42 St George St, Toronto, ON';
  //$scope.leaveAt = ''; init to current time

  $scope.transitModes = [
    { 
        mode: 'walk'
    },
    {
        mode: 'bicycle'
    },
    {
        mode: 'train' 
    },
    {
        mode: 'car' 
    }
  ];

  $scope.directions = [
    { title: 'Reggae' },
    { title: 'Chill' },
    { title: 'Dubstep' },
    { title: 'Indie' },
    { title: 'Rap' },
    { title: 'Cowbell' }
  ];


  $scope.selectedMode = -1;
  $scope.selectMode = function(_id){
    console.log($scope.selectedMode);
    $scope.selectedMode = _id;
    console.log($scope.selectedMode);
    console.log("\n");
  };


});

