// App Controller
app.controller('AppController', [function() {
  var vm = this;
}]);

/*******************************************************************************
                                      Home
*******************************************************************************/
app.controller('HomeController', ['cfpLoadingBar', '$timeout', function(cfpLoadingBar, $timeout) {
  var vm = this;
  vm.startLoad = function() {
    cfpLoadingBar.start();
  };

  vm.completeLoad = function() {
    cfpLoadingBar.complete();
  }

  // fake the initial load so first time users can see the bar right away:
  vm.startLoad();
  vm.fakeIntro = true;
  $timeout(function() {
    vm.completeLoad();
    vm.fakeIntro = false;
  }, 1250);
}]);

/*******************************************************************************
                                      404
*******************************************************************************/
app.controller('ErrorController', ['cfpLoadingBar', '$timeout', function(cfpLoadingBar, $timeout) {
  var vm = this;
  vm.startLoad = function() {
    cfpLoadingBar.start();
  };

  vm.completeLoad = function() {
    cfpLoadingBar.complete();
  }

  // fake the initial load so first time users can see the bar right away:
  vm.startLoad();
  vm.fakeIntro = true;
  $timeout(function() {
    vm.completeLoad();
    vm.fakeIntro = false;
  }, 1250);
}]);

/*******************************************************************************
                                  Profile
*******************************************************************************/
app.controller('ProfileController', ['$http', 'cfpLoadingBar', '$timeout', 'ProfileService', '$routeParams', function($http, cfpLoadingBar, $timeout, ProfileService, $routeParams) {
  var vm = this;
  vm.data = ProfileService.data;
  this.message = 'Hello world';

  // Get profile info
  ProfileService.profile($routeParams.username);

  // Get stats info
  ProfileService.stats($routeParams.username);

  vm.startLoad = function() {
    cfpLoadingBar.start();
  };

  vm.completeLoad = function() {
    cfpLoadingBar.complete();
  }

  // fake the initial load so first time users can see the bar right away:
  vm.startLoad();
  vm.fakeIntro = true;
  $timeout(function() {
    vm.completeLoad();
    vm.fakeIntro = false;
  }, 1250);
}]);
