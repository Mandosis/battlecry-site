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
