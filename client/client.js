var app = angular.module('battlecryApp', ['ngRoute', 'angular-loading-bar']);

app.controller('MainController', ['$http', 'cfpLoadingBar', function($http, cfpLoadingBar) {
  var vm = this;
  vm.message = 'Welcome'
}]);
