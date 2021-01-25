

let jsonData =  [
        { "id":  1, "year": 2020, "month": "January", "rainfall": 127 },
        { "id":  2, "year": 2020, "month": "March", "rainfall": 90},
        { "id":  3, "year": 2020, "month": "February", "rainfall": 108},
        { "id":  4, "year": 2020, "month": "April", "rainfall": 51},
        { "id":  5, "year": 2020, "month": "May", "rainfall": 15},
        { "id":  6, "year": 2020, "month": "June", "rainfall": 9},
        { "id":  7, "year": 2020, "month": "July", "rainfall": 10},
        { "id":  8, "year": 2020, "month": "August", "rainfall": 10},
        { "id":  9, "year": 2020, "month": "September", "rainfall": 25},
        { "id": 10, "year": 2020, "month": "September", "rainfall": 25},
        { "id": 11, "year": 2020, "month": "October", "rainfall": 75},
        { "id": 12, "year": 2020, "month": "November", "rainfall": 115},
        { "id": 13, "year": 2020, "month": "December", "rainfall": 131}];

var svgWidth = 1000;
var svgHeight = 300;

var heightPad = 50;
var widthPad = 50;

var svg = d3.select("#rainfalls-chart")
    .append("svg")
    .attr("width", svgWidth + (widthPad * 2))
    .attr("height", svgHeight + (heightPad * 2))
    .append("g")
    .attr("transform", "translate(" + widthPad + "," + heightPad + ")");

//Set up scales
var xScale = d3.scale.ordinal()
    .domain(jsonData.map(function (d) {
        return d.month;
    }))
    .rangeRoundBands([0, svgWidth], .1);

var yScale = d3.scale.linear()
    .domain([0, 200])
    .range([svgHeight, 0]);

// Create bars
svg.selectAll("rect")
    .data(jsonData)
    .enter().append("rect")
    .attr("x", function (d) {
        return xScale(d.month) + widthPad;
    })
    .attr("y", function (d) {
        return yScale(d.rainfall);
    })
    .attr("height", function (d) {
        return svgHeight - yScale(d.rainfall);
    })
    .attr("width", xScale.rangeBand())
    .attr("fill", "green");

// Y axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + widthPad + ",0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .style("text-anchor", "end")
    .text("Average in mm");

// X axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
    .call(xAxis)
    .append("text")
    .attr("x", svgWidth / 2 - widthPad)
    .attr("y", 50)
    .text("Months");