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
  $scope.location.origin = "169 Huron Street, Toronto";
  $scope.location.destination = "545 Sherbourne Street, Toronto";

  SMS.startWatch(function(){
    SMS.enableIntercept(true, function(){
    }, function(){
      alert('error intercepting');
    });

  },function () {
    alert('error watching');
  });

  $scope.sendSMS = function() {
    console.log("SENDING!!");
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

.controller('DirectionsCtrl', function($scope, DirectionsFactory) {

  DirectionsFactory.reset();
  $scope.directions = [];

  /*$scope.incomingSMSHandler = function(sms){
    console.log('PREVIOUS SMS ->');
    console.log(DirectionsFactory.getDirections());
    console.log('INCOMING SMS ->')
    console.log(sms.data.body);
    DirectionsFactory.addDirections(sms.data.body);
    angular.copy($scope.directions, DirectionsFactory.getDirections());
    console.log("scope:::");
    console.log($scope.directions);
  }*/

  if(!DirectionsFactory.isAttachedListener()) {
    $scope.listener = document.addEventListener('onSMSArrive', function(sms) {
      console.log(sms.data.body);
      DirectionsFactory.addDirections(sms.data.body);
      $scope.$apply(function() {
        console.log(DirectionsFactory.getDirections());
        $scope.directions = DirectionsFactory.getDirections();
      })
      console.log($scope.directions.length);
    });
    DirectionsFactory.attachListener($scope.listener);
  }

});
