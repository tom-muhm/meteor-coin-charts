var getBtceTradeCollections = function () {
  var btceTrades = {};
  _.each(BTCE_PAIRS, function (pair) {
    btceTrades[pair] = new Meteor.Collection('btce_trades-' + pair);
  });
  return btceTrades;
}

TradeCollections = getBtceTradeCollections();

Trades = new Meteor.Collection('trades');


TradeCollections.insert = function (pair, trades) {
  var collection = TradeCollections[pair];
  Fiber(function () {
    _.each(trades, function (trade) {
      collection.insert(trade);
    });
  }).run();
}

//Trades = new Meteor.Collection("trades");
//Trades.insertAll = function (trades) {
//  Fiber(function () {
//    _.each(trades, function (trade) {
//      Log.info('insert');
//      Log.info(trade);
//      Trades.insert(trade);
//    });
//  }).run();
//}


//Trades = {
//  all: function () {
//    return trades.find();
//  },
//  find: function (params) {
//    return trades.find(params);
//  },
//  insert: function (trade) {
//    Fiber(function () {
//      console.log('insert');
//      trades.insert(trade);
//    }).run();
//  },
//  insertAll: function (trades) {
//    console.log('insert all');
//    _.each(trades, this.insert);
//  },
//  findLast: function () {
//    console.log('find last');
//  },
//  removeAll: function () {
//    console.log('remove all');
//    trades.remove({});
//  }
//}