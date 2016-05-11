/*******************************************************************************
                                    Head
*******************************************************************************/
app.factory('HeadService', function() {
  var tags = {};

  var title = function(title) {
    tags.title = title + ' | Battlecry'
  }

  return {
    tags: tags,
    title: title
  }
})

/*******************************************************************************
                                  Profile
*******************************************************************************/
app.factory('ProfileService', ['$http', function($http) {
  var data = {};

  // Get account information
  var profile = function(username) {
    $http.get('/app/v1/players/' + username).then(function(response) {
      data.account = response.data;
    });
  }

  // Get all stats for player
  var stats = function(username) {
    $http.get('/app/v1/players/' + username + '/stats').then(function(response) {
      data.stats = response.data;
    });
  }

  return {
    data: data,
    profile: profile,
    stats: stats,
  }
}]);

/*******************************************************************************
                                User Service
*******************************************************************************/
app.factory('UserService', ['$http', function($http) {

  var user = {};

  // Login
  var login = function(username, password, callback) {
    // Create user object to send
    var user = {
      username: username,
      password: password
    }

    // Post username and password to api
    $http.post('/app/v1/login/', user).then(function(response) {
      callback(response.data);
    }, function(response) {
      callback({
        success: false,
        message: 'Username or password incorrect'
      });
    });
  }

  // Logout
  var logout = function(callback) {
    $http.get('/app/v1/logout').then(function(request) {
      user.data = {};
      callback();
    });
  }

  // Checked if user is authorized
  var isAuthenticated = function(callback) {
    $http.get('/app/v1/auth').then(function(response) {
      if(response.data.success == true) {
        user.data = response.data.user;
        callback(true, response.data);
      } else {
        callback(false);
      }
    });
  }

  return {
    user: user,
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated
  }
}]);

/*******************************************************************************
                                Community
*******************************************************************************/
app.factory('CommunityService', ['$http', function($http) {
  var data = {};

  var stats = function() {
    $http.get('/app/v1/community/stats').then(function(response) {
      data.stats = response.data.data;
      data.stats.kdChart = [data.stats.kills, data.stats.deaths];
      data.stats.wlChart = [data.stats.won, data.stats.lost];
    });
  }

  return {
    data: data,
    stats: stats,
  }
}]);
