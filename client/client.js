var app = angular.module('battlecryApp', ['ngRoute', 'angular-loading-bar', 'chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      datasetFill: false
    });

    ChartJsProvider.setOptions('doughnut', {
      chartColors: ['#FF3333', '#2222FF'],
      // circumference: 1 * Math.PI,
      // rotation: 3 * Math.PI,
      // cutoutPercentage: 70
    })
  }])
