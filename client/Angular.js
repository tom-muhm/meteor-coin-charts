if (ANGULARJS) {

  // Angular JS

  console.log("Loading Angular JS");

  var app = angular.module("meteorapp", ["meteor"]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {controller: "MeteorCtrl"});
  }]);

  var getBtceTradeCollections = function ($meteor) {
    console.log("getCollections");
    var btceTrades = {};
    _.each(BTCE_PAIRS, function (pair) {
      btceTrades[pair] = $meteor("btce_trades-" + pair);
    });
    return btceTrades;
  };

  app.controller("MeteorCtrl", ["$scope", "$meteor", function ($scope, $meteor) {
    // $scope.Trades = $meteor("trades");
    $scope.tradesPerPair = getTrades(TradeCollections); //getTrades(getBtceTradeCollections($meteor));
    $scope.startScraper = function () {
      Meteor.call("startScraper");
    };
    $scope.deleteAllData = function () {
      Meteor.call("deleteAll");
    };
  }]);
}