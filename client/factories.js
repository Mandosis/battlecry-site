app.factory('ProfileService', ['$http', function($http) {
  var data = {};

  var profile = function(username) {
    $http.get('/app/v1/players/' + username).then(function(response) {
      data.account = response.data;
      console.log('running profile data fetcher');
    });
  }

  var stats = function(username) {
    // Get overall stats
    $http.get('/app/v1/players/' + username + '/stats/overall').then(function(response) {
      data.overall = response.data;
    });

    // Get conquest stats
    $http.get('/app/v1/players/' + username + '/stats/conquest').then(function(response) {
      data.conquest = response.data;
    });

    // Get team death match stats
    $http.get('/app/v1/players/' + username + '/stats/tdm').then(function(response) {
      data.tdm = response.data;
    });

    // Get free for all stats
    $http.get('/app/v1/players/' + username + '/stats/ffa').then(function(response) {
      data.ffa = response.data;
    });
  }
  return {
    data: data,
    profile: profile,
    stats: stats,
  }
}]);
