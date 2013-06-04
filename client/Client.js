Meteor.startup(function () {
  console.log("Startup");
});

var getTrades = function (collections) {
  console.log('getTrades');
  var trades = {};
  _.each(collections, function (collection, pair) {
    trades[pair] = collection.find({}, {sort: {date: -1}});
  })
  return trades;
};

if (ANGULARJS) {

  // Angular JS

  console.log("Loading Angular JS");

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
  };

  app.controller('MeteorCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.Trades = $meteor('trades');
    $scope.tradesPerPair = getTrades(getBtceTradeCollections($meteor));
    $scope.startScraper = function () {
      Meteor.call('startScraper');
    };
    $scope.deleteAllData = function () {
      Meteor.call('deleteAll');
    };
  }]);

} else {

  console.log("Loading Handlebars Templates");

  // Handlebars Templates

  Meteor.Router.add({
    '/': 'recentTrades'
  });

  Template.recentTrades.tradesPerPair = getTrades(TradeCollections);

  Template.actionButtons.events({
    'click #startScraper': function (event) {
      Meteor.call('startScraper');
    },
    'click #deleteAllData': function (event) {
      Meteor.call('deleteAll');
    }
  });

}