app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/app/view/home',
      controller: 'HomeController',
      controllerAs: 'home',
    })
    .when('/community', {
      templateUrl: '/app/view/community',
      controller: 'CommunityController',
      controllerAs: 'community'
    })
    .when('/player/:username', {
      templateUrl: function(params) {
        return '/app/view/player/' + params.username;
      },
      controller: 'PlayerController',
      controllerAs: 'player'
    })
    .when('/profile', {
      templateUrl: '/app/view/profile',
      controller: 'ProfileController',
      controllerAs: 'profile'
    })
    .when('/profile/edit', {
      templateUrl: '/app/view/profile/edit',
      controller: 'EditController',
      controllerAs: 'edit'
    })
    .when('/login', {
      templateUrl: '/app/view/login',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/logout', {
      templateUrl: '/app/view/logout',
      controller: 'LogoutController',
      controllerAs: 'logout'
    })
    .otherwise({
      templateUrl: '/app/view/404',
      controller: 'ErrorController',
      controllerAs: 'error'
    })
  $locationProvider.html5Mode(true);
}]);
