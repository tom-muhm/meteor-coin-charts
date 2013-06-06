Fiber = Npm.require('fibers');
async = Npm.require('async');
var winston = Npm.require('winston');
log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({timestamp: true, level: 'debug'})
  ]
});