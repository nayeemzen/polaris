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

  SMS.startWatch(function(){
    SMS.enableIntercept(true, function(){
    }, function(){
      alert('error intercepting');
    });

  },function () {
    alert('error watching');
  });

// 16476910576
// 16475593820 (Zen)

  $scope.sendSMS = function() {
    SMS.sendSMS('+16475593820', $scope.location, function() {
    }, function(e) {
      console.log('Message Failed:' + e);
    });

    $location.path('/app/showDirections');
  }

  $scope.selectedMode = -1;
  $scope.selectMode = function(_id){
    $scope.selectedMode = _id;
    console.log(_id);
    $scope.location.mode = $scope.transitModes[parseInt(_id)].mode;
    console.log($scope.location);
  };

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

})

.controller('DirectionsCtrl', function($scope) {

  var filter = {};
  filter.box = 'inbox';
  filter.address = '+16475593820';
  filter.maxCount = 1;
  $scope.temp = "";
  $scope.directions = "";
  $scope.count = 0;

  document.addEventListener('onSMSArrive', function(msg){
    if($scope.count < 2) {
      $scope.count++;
      $scope.temp += msg.data.body;
      if($scope.count == 2) {
        $scope.$apply(function() {
          $scope.directions = $scope.temp
          .split(/-(.+)?/)[1]
          .replace('(','')
          .replace(')','')
          .split(',');
        });
        $scope.temp = "";
        $scope.count = 0;
      }
    }
  });



});
