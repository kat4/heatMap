
  // VARIABLES
  // Number of data points
  var dataPoints = 100;
  // range of data - maximum X value vs maximum Y value (scale)
  var maxX = 5000, maxY = 1000;
  // number of squares per X and per Y
  var scaleX = 10, scaleY = 10;

  // generates an array of 100 objects {x, y} (random numbers, each between 0 and 100)
  var randomNumberGenerator = function(dataPoints, maxX, maxY) {
    var points = [];

    for (var i = 0; i < dataPoints; i++) {
        points[i] = {
            "x": twoDP(Math.random()*maxX),
            "y": twoDP(Math.random()*maxY)
        };
    }
    return points;
};

//function to round points to 2dp
var twoDP = function(n) {
    return Math.floor(n * 100)/100;
};

//function that gives the numbered square the point is in
var pointToSquareLocation = function(point) {
    return Math.floor(point.y/maxY*10)*10 + Math.floor(point.x/maxX*10);
};

//function creating array numbered 0 - n
var blankSquares = function(n) {
    var emptySquares = [];
    for (var i = 0; i < n; i++) {
        emptySquares.push(i);
    }
    return emptySquares;
};

// function which creates object of 100 blank squares
var emptyGrid =  blankSquares(scaleX * scaleY).reduce(function(accum, curr) {
    accum[curr] = 0;
    return accum;
}, {});

var squareCountObj = function(gridObject, squareLocationArray) {
    squareLocationArray.forEach(function(element){
            gridObject[element] ++;
    });
   return gridObject;
};


//implementation
var pointsArray = randomNumberGenerator(dataPoints,maxX,maxY);
var squares = pointsArray.map(pointToSquareLocation);
var finalObj = squareCountObj(emptyGrid, squares);
var finalArray = [];

Object.keys(finalObj).forEach(function(element, index){
    finalArray.push({
        "id": element,
        "opacity": finalObj[element]
    });
});


var maxOpacity = finalArray.reduce(function(prev, curr){
    return prev.opacity > curr.opacity ? prev : curr;
  }).opacity;

var scaledOpacityArray = finalArray.map(function(obj) {
      var scaledObj = {};
      scaledObj.i = obj.id;
      scaledObj.d = obj.opacity/maxOpacity;
      return scaledObj;
  });

var squarew =20;

// Visualisation function - createData(99);
d3.select(".container").selectAll("rect")
  .data(scaledOpacityArray)
  .enter()
  .append("rect")
  .attr("class", "square")
  .attr("height", squarew)
  .attr("width", squarew)
  .attr("fill", "red")
  .attr("display", "in-line")
  .attr("opacity", function(d) {
    return "opacity", d.d;
  })
  .attr("x", function(d, i) {
    return (i%scaleY)*squarew;
     })
   .attr("y", function(d,i){
     return Math.floor(i/scaleX)*squarew;
   });
