var https = Npm.require("https");
var url = Npm.require("url");
var util = Npm.require("util");
var BTCE_CORE = Npm.require("btce");

BTCE = function (params) {
  if (!params) params = {};

  this.key = params.key;
  this.secret = params.secret;
  this.agent = params.agent;

  this.urlPost = "https://btc-e.com:443/tapi";
  this.urlGet = "https://btc-e.com:443/api/2/";
  this.nonce = this.getTimestamp(Date.now());
}

util.inherits(BTCE, BTCE_CORE);

BTCE.prototype.getHTTPS = function (getUrl, callback) {
  var options = url.parse(getUrl);
  options.method = "GET";
  options.agent = this.agent;
  var req = https.request(options, function (res) {
    var data = "";
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      callback(false, JSON.parse(data));
    });
  });

  req.on("error", function (err) {
    callback(err, null)
  });

  req.end();
};