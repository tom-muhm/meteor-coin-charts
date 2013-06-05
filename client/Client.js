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
    // $scope.Trades = $meteor('trades');
    $scope.tradesPerPair = getTrades(TradeCollections); //getTrades(getBtceTradeCollections($meteor));
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
    '/': 'handlebars-main'
  });

  Template.recentTrades.tradesPerPair = getTrades(TradeCollections);

  Template.actionButtons.events({
    'click #forceScraper': function (event) {
      Meteor.call('forceScraper');
    },
    'click #deleteAllData': function (event) {
      Meteor.call('deleteAll');
    }
//    TODO - make switch event work !
//    'switch-change #toggleScraper': function(event) {
//      console.log('start stop toggled');
//      Meteor.call('toggleScraper');
//    }
  });

  Template.actionButtons.rendered = function () {
    // apply bootstrap switch - to all switch classes
    $('.switch')['bootstrapSwitch']();
    $('#toggleScraper').on('switch-change', function (event, data) {
      Meteor.call('toggleScraper', data.value);
    });
  }

}
