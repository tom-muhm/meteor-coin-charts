Meteor.startup(function () {
  log.info("Startup");
});

var scraperRunning = false;
var scraper = new Scraper();

Meteor.methods({
  forceScraper: function () {
    log.debug('method call: startScraper');
    scraper.startPairs(BTCE_PAIRS, function() {
      // callback
    });
  },

  deleteAll: function () {
    log.debug('method call: deleteAll');
    Trades.removeAll();
  },

  toggleScraper: function(value) {
    log.debug('method call: toggleScraper: ' + value)
    if (value === true) {

    } else {

    }
  }
});
