Meteor.startup(function () {
  log.info("Startup");
});

var allScraper = new Scraper(BTCE_PAIRS, 10000);

Meteor.methods({
  forceScraper: function () {
    log.debug('method call: startScraper');
    allScraper.startPairs(BTCE_PAIRS, function () {
      // callback
    });
  },

  deleteAll: function () {
    log.debug('method call: deleteAll');
    Trades.removeAll();
  },

  toggleScraper: function (value) {
    log.debug('method call: toggleScraper: ' + value)
    if (value === true) {
      log.info('starting scraper');
      allScraper.startSchedule(function () {
        log.info('scraper started');
      });
    } else {
      log.info('stopping scraper');
      allScraper.stopSchedule(function () {
        log.info('scraper stopped');
      });
    }
  }
});
