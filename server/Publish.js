//Meteor.publish("btc_usd", function () {
//  var twoHouseAgo = +moment().subtract("hours", 24).format("X")
//  return TradeCollections["btc_usd"].find({date: {$gt: twoHouseAgo}}, {fields: {date: 1, price: 1, amount: 1}});
//});
//Meteor.publish("ltc_usd", function () {
//  var twoHouseAgo = +moment().subtract("hours", 24).format("X")
//  return TradeCollections["ltc_usd"].find({date: {$gt: twoHouseAgo}}, {fields: {date: 1, price: 1, amount: 1}});
//});