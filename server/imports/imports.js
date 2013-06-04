Fiber = Npm.require('fibers');
var winston = Npm.require('winston');
log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({timestamp: true, level: 'debug'})
  ]
});