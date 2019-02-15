function toRadians(degrees){
  return degrees * (Math.PI / 180);
}

// building from: http://jsfiddle.net/HETvZ/
function drawChartArc(percentage, canvasId){
  
  // canvas and context for drawing
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  
  // calculating the arc
  var degrees = percentage * 360.0;
  // degrees to radians
  var radians = toRadians(degrees);
  var arcX = 55;
  var arcY = 55;
  var radius = 40;
  var startAngle = toRadians(270); // in radians
  var endAngle = radians + startAngle; // in radians
  var anticlockwise = false;
  
  // draw the arc
  context.beginPath();
  context.lineWidth = 19;
  context.strokeStyle = "rgb(250,50,50)";
  context.arc(arcX, arcY, radius, startAngle, endAngle, anticlockwise);
  context.stroke();
}


drawChartArc(.77, "arc");