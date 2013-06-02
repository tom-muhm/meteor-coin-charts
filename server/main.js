Meteor.startup(function () {

//  Trades.remove({});

//  var trades = Trades.find().fetch();
//
//  _.each(trades, function (trade) {
//    Log.info('Trade:');
//    Log.info(trade);
//  });
//
//  var scraper = new Scraper();

//    scraper.startPairs(BTCE_PAIRS);
//  scraper.startPairs(['btc_usd']);

});

var scraper = new Scraper();

Meteor.methods({
  startScraper: function() {
    console.log('start scraper: method call');
    scraper.startPairs(BTCE_PAIRS);
  }
})
