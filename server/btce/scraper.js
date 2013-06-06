var HttpsAgent = Npm.require('agentkeepalive').HttpsAgent;

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
}

Scraper.prototype.startPair = function (pair, cb) {
  log.debug('starting scraper for ' + pair);
  btce.trades({pair: pair, count: 2}, function (err, trades) {
    tradesCb(err, pair, trades);
    cb();
  });
}

Scraper.prototype.startPairs = function (cb) {
  var self = this;
  log.debug('starting pairs ' + self.pairs);
  async.each(self.pairs, self.startPair, function () {
    cb();
  })
}

Scraper.prototype.runSchedule = function () {
  var self = this;
  if (self.schedulerRunning === true) {
    self.startPairs(function () {
      setTimeout(function () {
        self.runSchedule();
      }, self.scheduleTimer);
    })
  }
}

Scraper.prototype.startSchedule = function (cb) {
  var self = this;
  self.schedulerRunning = true;
  self.runSchedule();
  cb();
}

Scraper.prototype.stopSchedule = function (cb) {
  this.schedulerRunning = false;
  cb();
}

function tradesCb(err, pair, trades) {
  if (err) {
    log.error('trades - error');
    log.error(err);
  } else {
    log.debug('inserting');
    Trades.insert(pair, trades);
  }
}