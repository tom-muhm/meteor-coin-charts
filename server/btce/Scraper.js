var HttpsAgent = Npm.require("agentkeepalive").HttpsAgent;
var BTCE = require('./BtceExt');
var log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({timestamp: true, level: 'debug'})
  ]
});

var agent = new HttpsAgent({
  maxSockets: 100,
  maxKeepAliveRequests: 0, // max requests per keepalive socket, default is 0, no limit.
  maxKeepAliveTime: 300000 // keepalive for 5 minutes
});
var btce = new BTCE({agent: agent});

Scraper = function (pairs, time) {
  var self = this;
  self.pairs = pairs;
  self.scheduleTimer = time;
  self.schedulerRunning = false;
  self.schedulerWaiting = null;
};

Scraper.prototype.startPair = function (pair, count, cb) {
//  log.debug("starting scraper for " + pair);
  btce.trades({pair: pair, count: count}, function (err, trades) {
    tradesCb(err, pair, trades);
    cb && cb();
  });
};

Scraper.prototype.startPairs = function (count, cb) {
  var self = this;
  log.debug("starting pairs " + self.pairs);
  async.each(self.pairs,
    function (pair, asyncCb) {
      self.startPair(pair, count, asyncCb);
    }, function () {
      cb && cb();
    });
};

Scraper.prototype.runSchedule = function (count) {
  var self = this;
  if (self.schedulerRunning === true) {
    self.startPairs(count, function () {
      self.schedulerWaiting = setTimeout(function () {
        self.runSchedule(10);
      }, self.scheduleTimer);
    })
  }
};

Scraper.prototype.startSchedule = function (cb) {
  var self = this;
  self.schedulerRunning = true;
  self.runSchedule(100);
  cb && cb();
};

Scraper.prototype.stopSchedule = function (cb) {
  var self = this;
  self.schedulerRunning = false;
  clearTimeout(self.schedulerWaiting);
  cb && cb();
};

Scraper.prototype.scrapAll = function (cb) {
  var self = this;
  self.startPairs(10000000000);
};

function tradesCb(err, pair, trades) {
  if (err) {
    log.error("trades - error");
    log.error(err);
  } else {
//    log.debug("inserting");
    Trades.insert(pair, trades);
  }
}