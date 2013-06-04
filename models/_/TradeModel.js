var getBtceTradeCollections = function () {
  var btceTrades = {};
  _.each(BTCE_PAIRS, function (pair) {
    btceTrades[pair] = new Meteor.Collection('btce_trades-' + pair);
  });
  return btceTrades;
};

if ((!ANGULARJS && Meteor.isClient) || Meteor.isServer) {
  TradeCollections = getBtceTradeCollections();
}

if (Meteor.isServer) {

  TradeCollections.insert = function (pair, trades) {
    var collection = TradeCollections[pair];
    Fiber(function () {
      _.each(trades, function (trade) {
        collection.insert(trade);
      });
    }).run();
  };

  TradeCollections.removeAll = function () {
    _.each(TradeCollections, function (collection) {
      collection.remove({});
    })
  };

}


