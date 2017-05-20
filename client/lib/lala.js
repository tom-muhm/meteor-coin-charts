if (false) {


  Template.d3chart.rendered = function () {

    var data = [5, 10, 25, 50, 30];

    var chart = d3.select("body")
      .append("svg")
      .attr("class", "chart")
      .attr("width", 440)
      .attr("height", 140)
      .append("g")
      .attr("transform", "translate(10,15)");

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

    var y = d3.scale.ordinal()
      .domain(data)
      .rangeBands([0, 120]);

    chart.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("y", y)
      .attr("width", x)
      .attr("height", y.rangeBand());

    chart.selectAll("text")
      .data(data)
      .enter().append("text")
      .attr("x", x)
      .attr("y", function (d) {
        return y(d) + y.rangeBand() / 2;
      })
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(String);

    chart.selectAll("line")
      .data(x.ticks(10))
      .enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", 120)
      .style("stroke", "#ccc");

    chart.selectAll(".rule")
      .data(x.ticks(10))
      .enter().append("text")
      .attr("class", "rule")
      .attr("x", x)
      .attr("y", 0)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);

    chart.append("line")
      .attr("y1", 0)
      .attr("y2", 120)
      .style("stroke", "#000");


    var t = 1297110663, // start time (seconds since epoch)
      v = 70, // start value (subscribers)
      data = d3.range(33).map(next); // starting dataset

    function next() {
      return {
        time: ++t,
        value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
      };
    }

//    setInterval(function () {
//      data.shift();
//      data.push(next());
//      redraw();
//    }, 10000);

    var w = 20,
      h = 80;

    var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);

    var y = d3.scale.linear()
      .domain([0, 100])
      .rangeRound([0, h]);

    var chart = d3.select("body").append("svg")
      .attr("class", "chart")
      .attr("width", w * data.length - 1)
      .attr("height", h);

    chart.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", function (d, i) {
        return x(i) - .5;
      })
      .attr("y", function (d) {
        return h - y(d.value) - .5;
      })
      .attr("width", w)
      .attr("height", function (d) {
        return y(d.value);
      });

    chart.append("line")
      .attr("x1", 0)
      .attr("x2", w * data.length)
      .attr("y1", h - .5)
      .attr("y2", h - .5)
      .style("stroke", "#000");

    function redraw() {

      var rect = chart.selectAll("rect")
        .data(data, function (d) {
          return d.time;
        });

      rect.enter().insert("rect", "line")
        .attr("x", function (d, i) {
          return x(i + 1) - .5;
        })
        .attr("y", function (d) {
          return h - y(d.value) - .5;
        })
        .attr("width", w)
        .attr("height", function (d) {
          return y(d.value);
        })
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
          return x(i) - .5;
        });

      rect.transition()
        .duration(1000)
        .attr("x", function (d, i) {
          return x(i) - .5;
        });

      rect.exit().transition()
        .duration(1000)
        .attr("x", function (d, i) {
          return x(i - 1) - .5;
        })
        .remove();

    }

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.close);
      });

  }
//
//    var data = [
//      {},
//      {},
//      {}
//    ]
//
//    var svg = d3.select("body").append("svg") //d3.select(self.node)
//      .data([
//        {date: 1-May-12, close: 582.13},
//        {date: 2-May-12, close: 600.13},
//        {date: 3-May-12, close: 700.13}]
//      )
//      .attr("width", width + margin.left + margin.right)
//      .attr("height", height + margin.top + margin.bottom)
//      .append("g")
//      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//

//    d3.tsv("data.tsv", function (error, data) {
//      data.forEach(function (d) {
//        d.date = parseDate(d.date);
//        d.close = +d.close;
//      });
//
//      x.domain(d3.extent(data, function (d) {
//        return d.date;
//      }));
//      y.domain(d3.extent(data, function (d) {
//        return d.close;
//      }));
//
//      svg.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + height + ")")
//        .call(xAxis);
//
//      svg.append("g")
//        .attr("class", "y axis")
//        .call(yAxis)
//        .append("text")
//        .attr("transform", "rotate(-90)")
//        .attr("y", 6)
//        .attr("dy", ".71em")
//        .style("text-anchor", "end")
//        .text("Price ($)");
//
//      svg.append("path")
//        .datum(data)
//        .attr("class", "line")
//        .attr("d", line);
//    });
}