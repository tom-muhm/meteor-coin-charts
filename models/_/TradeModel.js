var getBtceTradeCollections = function () {
  var btceTrades = {};
  _.each(BTCE_PAIRS, function (pair) {
    btceTrades[pair] = new Meteor.Collection("btce_trades-" + pair);
  });
  return btceTrades;
};

if ((!ANGULARJS && Meteor.isClient) || Meteor.isServer) {
  TradeCollections = getBtceTradeCollections();
}

if (Meteor.isServer) {

  _.each(TradeCollections, function (collection) {
    collection._ensureIndex({ tid: 1 }, { unique: true, sparse: true });
  })

  Trades = {};

  Trades.insert = function (pair, trades) {
    var collection = TradeCollections[pair];
    Fiber(function () {
      _.each(trades, function (trade) {
        try {
          collection.insert(trade);
          log.debug("insert: " + JSON.stringify(trade));
        } catch (err) {
          // dup key error
//          log.warn(err);
        }
      });
    }).run();
  };

  Trades.removeAll = function () {
    _.each(TradeCollections, function (collection) {
      collection.remove({});
    })
  };

}


