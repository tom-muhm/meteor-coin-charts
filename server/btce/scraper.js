var HttpsAgent = Npm.require('agentkeepalive').HttpsAgent;

var agent = new HttpsAgent({
  maxSockets: 100,
  maxKeepAliveRequests: 0, // max requests per keepalive socket, default is 0, no limit.
  maxKeepAliveTime: 300000 // keepalive for 5 minutes
});
var btce = new BTCE({agent: agent});

Scraper = function () {
}

Scraper.prototype.startPair = function (pair) {
  log.debug('starting scraper for ' + pair);
  btce.trades({pair: pair, count: 2}, function(err, trades) {
    tradesCb(err, pair, trades);
  });
}

Scraper.prototype.startPairs = function (pairs) {
  log.debug('starting pairs ' + pairs);
  _.each(pairs, this.startPair);
}

function tradesCb(err, pair, trades) {
  if (err) {
    log.error('trades - error');
    log.error(err);
  } else {
    log.debug('inserting');
    TradeCollections.insert(pair, trades);
  }
}