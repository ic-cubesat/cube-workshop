function updateTime(){
  document.getElementById("Date").innerHTML = new Date().toLocaleString();
}

window.onload = function () {
  setInterval(updateTime, 1000);
  var canvas = document.getElementById("map");
  window.renderer = new Renderer(canvas);
  setInterval(update, 500);
}

update = function () {
  window.renderer.draw();
}


// Handles the rendering of the main map
Renderer = function (canvas) {
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;
  this.background = new Image();
  this.background.src = 'earth.jpg';
}


Renderer.prototype.lon_to_x = function(lon)
{
  return this.width * (lon+180)/360;
}


Renderer.prototype.lat_to_y = function(lat)
{
  var limit = Math.log(Math.tan(Math.PI/4 + 82/180*Math.PI/2));
  var lat_rad = lat * Math.PI / 180;
  return this.height * (0.5 - Math.log(Math.tan(Math.PI/4 + lat_rad/2)) / 2 / limit);
}


Renderer.prototype.draw = function() {
  this.context.drawImage(this.background, 0, 0, this.width, this.height);
  this.context.fillStyle = "green";
  for(var i = 0; i < 800; i++)
    this.context.fillRect(i,200 + 150*Math.sin((0.888)*Math.PI*i/180),2,2);
  var x = this.lon_to_x(-122); // San Fransisco
  var y = this.lat_to_y(+38);
  this.context.fillStyle = "red";
  this.context.fillRect(x-5, y-5, 10, 10);
}
