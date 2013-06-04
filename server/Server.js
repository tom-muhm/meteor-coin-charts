Meteor.startup(function () {
  log.info("Startup");
});

var scraper = new Scraper();

Meteor.methods({
  startScraper: function () {
    log.debug('method call: startScraper');
    scraper.startPairs(BTCE_PAIRS);
  },

  deleteAll: function () {
    log.debug('method call: deleteAll');
    TradeCollections.removeAll();
  }
});
