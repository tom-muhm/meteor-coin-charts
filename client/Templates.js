if (ANGULARJS) {
} else {

  console.log("Loading Handlebars Templates");

  // Handlebars Templates

  Meteor.Router.add({
    "/": "handlebars-main"
  });

  Template.recentTrades.tradesPerPair = getTrades(TradeCollections);

  Template.actionButtons.events({
    "click #forceScraper": function (event) {
      Meteor.call("forceScraper");
    },
    "click #deleteAllData": function (event) {
      Meteor.call("deleteAll");
    },
    "click #scrapEverything": function (event) {
      Meteor.call("scrapAll");
    }
//    TODO - make switch event work !
//    "switch-change #toggleScraper": function(event) {
//      console.log("start stop toggled");
//      Meteor.call("toggleScraper");
//    }
  });

  Template.actionButtons.rendered = function () {
    // create scraper switch button with init state
    Meteor.call("scraperState", function (err, status) {
      $("#toggleScraper input").prop("checked", status);
      // apply bootstrap switch - to all switch classes
      $(".switch")["bootstrapSwitch"]();
      $("#toggleScraper").on("switch-change", function (event, data) {
        Meteor.call("toggleScraper", data.value);
      });
    });
  }

  Template.charts.rendered = function () {
    var self = this;
    self.node = self.find("svg");

    nv.addGraph(function () {
      var chart = nv.models.lineChart();

      chart.xAxis
        .axisLabel("Time")
        .tickFormat(function (d) {
          return d3.time.format("%c")(new Date(d * 1000));
        });

      chart.yAxis
        .axisLabel("Price (USD)")
        .tickFormat(d3.format(".02f"));

      if (!self.handle) {
        self.handle = Deps.autorun(function () {
          d3.select(self.node)
            .datum(chartData())
//            .transition().duration(500)
            .call(chart);
        });
        nv.utils.windowResize(chart.update);
      }

      function chartData() {
        var coin = [];
        var data = TradeCollections["btc_usd"].find({}, {sort: {date: -1}}).fetch();
        _.each(data, function (trade) {
          coin.push({x: trade.date, y: trade.price});
        })
        return [
          {values: coin, key: "BTC-USD"}
        ];
      };

      chart.dispatch.on("stateChange", function (e) {
        console.log("LALA");
        nv.log("New State:", JSON.stringify(e));
      });

      return chart;
    });
  };

  Template.highchart.rendered = function () {

    Deps.autorun(function () {
//    });

    // Create the chart

//    Deps.nonreactive(function () {
      $('#highchart').highcharts('StockChart', {
        chart: {
          events: {
            load: function () {
//                // set up the updating of the chart each second
//                  var series = chartData();
////                setInterval(function () {
////                  var x = (new Date()).getTime(), // current time
////                    y = Math.round(Math.random() * 500);
////                  series.addPoint([x, y], true, true);
////                }, 1000);
            }
          }
        },

        rangeSelector: {
          selected: 1
        },

        title: {
          text: 'AAPL Stock Price'
        },


        series: [
          {
            name: 'AAPL',
//              data: data,
            data: chartData(),
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      });
    });

    console.log("lala");
  }


  chartData = function () {
    var coin = [];
    var data = TradeCollections["btc_usd"].find({}, {sort: {date: 1}}).fetch();
    _.each(data, function (trade) {
      coin.push([trade.date * 1000, trade.price]);
//      coin.push({x: trade.date, y: trade.price});
    });
    return coin;
//      {values: coin, key: "BTC-USD"}

  };

}