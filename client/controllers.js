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
                                  Community
*******************************************************************************/
app.controller('CommunityController', ['HeadService', 'CommunityService', 'UserService', 'cfpLoadingBar', '$timeout', '$location', function(HeadService, CommunityService, UserService, cfpLoadingBar, $timeout, $location) {
  var vm = this;
  vm.data = CommunityService.data;
  vm.searchInput = '';
  vm.searchError = '';

  // Set page title
  HeadService.title('Community');

  // Check if user is logged in
  UserService.isAuthenticated(function() {});

  // Search
  vm.search = function() {
    console.log('searching');
    CommunityService.search(vm.searchInput, function(found) {
      if (found == true) {
        vm.searchError = '';
        $location.path('/player/' + vm.searchInput);
      } else {
        vm.searchError = 'Player not found';
      }
    });
  }

  // Fetch stats
  CommunityService.stats();

  // Kills/Deaths Chart
  vm.kdLabels = ["Kills", "Deaths"];
  vm.kdOptions = {
  }

  // Wins/Losses Chart
  vm.wlLabels = ['Wins', 'Losses'];

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

}])

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
app.controller('LoginController', ['HeadService', 'cfpLoadingBar', '$timeout', 'UserService', '$routeParams', '$location', '$templateCache', function(HeadService, cfpLoadingBar, $timeout, UserService, $routeParams, $location, $templateCache) {
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.error = '';

  // Remove cached page
  $templateCache.removeAll();


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
                                  Sign up
*******************************************************************************/
app.controller('RegisterController', ['HeadService', 'cfpLoadingBar', '$timeout', 'UserService', '$routeParams', '$location', '$templateCache', '$location', function(HeadService, cfpLoadingBar, $timeout, UserService, $routeParams, $location, $templateCache, $location) {
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.passwordConfrim = '';
  vm.errors = [];

  // Remove cached page
  $templateCache.removeAll();


  // Set page title
  HeadService.title('Register');

  // Check if user is logged in
  UserService.isAuthenticated(function(status) {
    if (status == true) {
      $location.path('/');
    }
  });

  vm.register = function() {
    console.log('register clicked');
    UserService.register(vm.username, vm.password, vm.passwordConfirm, function(success, message) {
      if(success == true) {
        $location.path('/');
      } else {

        // Check if message was already added
        var addMessage = true;
        for(var it = 0; it < vm.errors.length; it++) {
          if (vm.errors[it] == message) {
            addMessage = false;
            return
          }
        }

        // If the message is unique, add it to the array
        if (addMessage == true) {
          vm.errors.push(message);
        }
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
app.controller('LogoutController', ['HeadService', 'cfpLoadingBar', '$timeout', 'UserService', '$routeParams', '$location', '$templateCache', function(HeadService, cfpLoadingBar, $timeout, UserService, $routeParams, $location, $templateCache) {
  var vm = this;

  // Remove cached page
  $templateCache.removeAll();


  // Set page title
  HeadService.title('Logout');

  // Check if user is logged in
  UserService.isAuthenticated(function(status) {
    if (status == true) {
      // Logout the user
      UserService.logout(function() {
        UserService.isAuthenticated(function(status, user) {
          console.log(status);
          // Redirect back to the homepage
          $location.path('/');
        });
      });
    } else {
      // Redirect back to the homepage
      $location.path('/');
    }
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
                                  Player
*******************************************************************************/
app.controller('PlayerController', ['HeadService', 'UserService', '$http', 'cfpLoadingBar', '$timeout', 'ProfileService', '$routeParams', function(HeadService, UserService, $http, cfpLoadingBar, $timeout, ProfileService, $routeParams) {
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

/*******************************************************************************
                                  Profile
*******************************************************************************/
app.controller('ProfileController', ['HeadService', 'UserService', '$http', 'cfpLoadingBar', '$timeout', 'ProfileService', '$routeParams', '$templateCache', function(HeadService, UserService, $http, cfpLoadingBar, $timeout, ProfileService, $routeParams, $templateCache) {
  var vm = this;
  vm.data = ProfileService.data;

  // Remove cached page
  $templateCache.removeAll();

  // Set page title
  HeadService.title(404);

  // Kills/Deaths Chart
  vm.kdLabels = ["Kills", "Deaths"];
  vm.kdOptions = {
  }

  // Win/Loss Chart
  vm.wlLabels = ["Won", "Lost"];
  vm.wlOptions = {
  }


  // Check if user is logged in
  UserService.isAuthenticated(function(success, data) {
    // Set page title
    HeadService.title(data.user.username);

    // Get profile info
    ProfileService.profile(data.user.username);


    // Fetch stats
    ProfileService.stats(data.user.username);

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
                              Profile Settings
*******************************************************************************/
app.controller('EditController', ['HeadService', 'UserService', '$http', 'cfpLoadingBar', '$timeout', 'ProfileService', '$routeParams', '$templateCache', function(HeadService, UserService, $http, cfpLoadingBar, $timeout, ProfileService, $routeParams, $templateCache) {
  var vm = this;
  vm.data = ProfileService.data;

  // Remove cached page
  $templateCache.removeAll();

  // Set page title
  HeadService.title(404);

  // Check if user is logged in
  UserService.isAuthenticated(function(success, data) {
    // Set page title
    HeadService.title(data.user.username);

    // Get profile info
    ProfileService.profile(data.user.username);


    // Fetch stats
    ProfileService.stats(data.user.username);
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
