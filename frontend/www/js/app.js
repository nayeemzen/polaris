<<<<<<< HEAD
angular.module('polaris', ['ionic', 'polaris.controllers', 'angular-datepicker'])
=======
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])
>>>>>>> 55818464e2f4f0a5085ac593b0640fc91470a137

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/landing.html",
<<<<<<< HEAD
        controller: 'MainCtrl'
=======
>>>>>>> 55818464e2f4f0a5085ac593b0640fc91470a137
      }
    }
  })

  .state('app.navigateRequest', {
    url: "/navigateRequest",
    views: {
      'menuContent': {
        templateUrl: "templates/navigateRequest.html",
        controller: 'NavigateCtrl'
      }
    }
  })

  .state('app.showDirections', {
    url: "/showDirections",
    views: {
      'menuContent': {
        templateUrl: "templates/showDirections.html",
<<<<<<< HEAD
        controller: 'DirectionsCtrl'
      }
    }
  })
=======
        controller: 'navigateCtrl'
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
      }
    }
  })

.state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html",
      }
    }
  })  

>>>>>>> 55818464e2f4f0a5085ac593b0640fc91470a137
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/home');
});
