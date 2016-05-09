/*******************************************************************************
                                  Head
*******************************************************************************/
app.controller('HeadController', ['HeadService', function(HeadService) {
  var vm = this;
  vm.tags = HeadService.tags;
}]);

/*******************************************************************************
                                    App
*******************************************************************************/
app.controller('AppController', ['UserService', function(UserService) {
  var vm = this;
  vm.user = UserService.user;

  UserService.isAuthenticated(function(authenticated, user) {
    console.log(authenticated);
  });
}]);

/*******************************************************************************
                                      Home
*******************************************************************************/
app.controller('HomeController', ['HeadService', 'UserService', 'cfpLoadingBar', '$timeout', function(HeadService, UserService, cfpLoadingBar, $timeout) {
  var vm = this;

  // Set page title
  HeadService.title('Home');

  // Check if user is logged in
  UserService.isAuthenticated(function() {

  });


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
app.controller('ErrorController', ['HeadService', 'UserService', 'cfpLoadingBar', '$timeout', function(HeadService, UserService, cfpLoadingBar, $timeout) {
  var vm = this;

  // Set page title
  HeadService.title('404');

  // Check if user is logged in
  UserService.isAuthenticated(function() {

  });


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
                                  Sign in
*******************************************************************************/
app.controller('LoginController', ['HeadService', 'cfpLoadingBar', '$timeout', 'UserService', '$routeParams', '$location', function(HeadService, cfpLoadingBar, $timeout, UserService, $routeParams, $location) {
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.error = '';

  // Set page title
  HeadService.title('Login');

  // Check if user is logged in
  UserService.isAuthenticated(function() {

  });


  vm.login = function() {
    UserService.login(vm.username, vm.password, function(response) {
      if(response.success) {
        $location.path('/');
        UserService.isAuthenticated(function(status, user) {
          console.log(status);
        });
      } else {
        vm.error = 'Username or password incorrect'
      }
    });
  }

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
                                  Logout
*******************************************************************************/
app.controller('LogoutController', ['HeadService', 'cfpLoadingBar', '$timeout', 'UserService', '$routeParams', '$location', function(HeadService, cfpLoadingBar, $timeout, UserService, $routeParams, $location) {
  var vm = this;

  // Set page title
  HeadService.title('Logout');

  // Check if user is logged in
  UserService.isAuthenticated(function() {

  });

  // Logout the user
  UserService.logout(function() {
    UserService.isAuthenticated(function(status, user) {
      console.log(status);
      // Redirect back to the homepage
      $location.path('/');
    });

  });

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
app.controller('ProfileController', ['HeadService', 'UserService', '$http', 'cfpLoadingBar', '$timeout', 'ProfileService', '$routeParams', function(HeadService, UserService, $http, cfpLoadingBar, $timeout, ProfileService, $routeParams) {
  var vm = this;
  vm.data = ProfileService.data;

  // Set page title
  HeadService.title($routeParams.username);

  // Check if user is logged in
  UserService.isAuthenticated(function() {

  });

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
