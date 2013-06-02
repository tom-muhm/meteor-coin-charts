var app = angular.module('meteorapp', ['meteor']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {controller: 'MeteorCtrl'});
}]);

var getBtceTradeCollections = function ($meteor) {
  console.log('getCollections');
  var btceTrades = {};
  _.each(BTCE_PAIRS, function (pair) {
    btceTrades[pair] = $meteor('btce_trades-' + pair);
  });
  return btceTrades;
}

var getTrades = function (collections) {
  console.log('getTrades');
  var trades = {};
  _.each(collections, function (collection, pair) {
    trades[pair] = collection.find({}, {sort: {date: -1}});
  })
  console.log(trades);
  return trades;
}


app.controller('MeteorCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
  $scope.tradesPerPair = getTrades(getBtceTradeCollections($meteor));
  $scope.Trades = $meteor('trades');
  $scope.startScraper = Meteor.call('startScraper');
}]);
