var allScraper = new Scraper(BTCE_PAIRS, 5000);

Meteor.methods({
  forceScraper: function () {
    log.debug("method call: startScraper");
    allScraper.startPairs(BTCE_PAIRS, function () {
      // callback
    });
  },

  deleteAll: function () {
    log.debug("method call: deleteAll");
    Trades.removeAll();
  },

  scrapAll: function () {
    log.debug("method call: scrapAll");
    allScraper.scrapAll();
  },

  scraperState: function() {
    return allScraper.schedulerRunning;
  },

  toggleScraper: function (value) {
    log.debug("method call: toggleScraper: " + value)
    if (value === true) {
      log.info("starting scraper");
      allScraper.startSchedule(function () {
        log.info("scraper started");
      });
    } else {
      log.info("stopping scraper");
      allScraper.stopSchedule(function () {
        log.info("scraper stopped");
      });
    }
  }
});
