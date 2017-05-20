Meteor.startup(function () {
  console.log("Startup");
});

getTrades = function (collections) {
  console.log("getTrades");
  var trades = {};
  _.each(collections, function (collection, pair) {
    trades[pair] = collection.find({}, {sort: {date: -1}, limit: 5 });
  })
  return trades;
};