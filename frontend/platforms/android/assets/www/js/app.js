angular.module('polaris', ['ionic', 'polaris.controllers', 'angular-datepicker'])

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
        controller: 'MainCtrl'
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
        controller: 'DirectionsCtrl'
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

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/home');
});
