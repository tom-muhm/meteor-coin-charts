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
  console.log('starting scraper for ' + pair);
  btce.trades({pair: pair, count: 2}, function(err, trades) {
    tradesCb(err, pair, trades);
  });
}

Scraper.prototype.startPairs = function (pairs) {
  console.log('starting pairs ' + pairs);
  _.each(pairs, this.startPair);
}

function tradesCb(err, pair, trades) {
  if (err) {
    console.log('trades - error');
    console.log(err);
  } else {
    console.log('inserting');
    TradeCollections.insert(pair, trades);
  }
}