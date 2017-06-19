function drawThings(things) {
	var canvas = document.getElementById("a"),
		context = canvas.getContext("2d"),
		center = {
			x : context.canvas.width / 2,
			y: context.canvas.height / 2
		}

	things.forEach(function(thing) {
		var length = thing.points.length
		thing.points.forEach(function(point, pointIndex) {
			var variant_width = (pointIndex * 0.03  > 1) ? (pointIndex * 0.03)  : 1;
			var variant_color = 'rgb(' +
				Math.floor(0  * (pointIndex / length)) + ',' +
				Math.floor(255  * (pointIndex / length)) + ',' +
				Math.floor(255 * (pointIndex / length)) + ')';
			drawLine(point, lastPoint(thing.points, pointIndex), 1, variant_color);
		});
	});


	function drawLine(point_one, point_two, width = 1, color = "#999") {
		context.beginPath();
		context.moveTo(point_one.x + center.x, point_one.y + center.y);
		context.lineTo(point_two.x + center.x, point_two.y + center.y);
		context.strokeStyle = color;
		context.lineWidth = width;
		context.stroke();

	}
	// window.requestAnimationFrame(drawThings);
}

function clearCanvas() {
	var canvas = document.getElementById("a"),
		context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);
}


function lastPoint(pointArray, head) {
	var lastPoint = pointArray[head - 1];
	return lastPoint ? lastPoint : { x : 0, y : 0 };
}



function createSpiral(angleMult = 0.7) {
	var spiral = {
		points : []
	}

	for (var i=0; i< 1400; i+= 1) {
		var angle = angleMult * i;
		var a = 2,
			b = 2,
			point = {
				x : (a + b * angle)*Math.cos(angle),
				y : (a + b * angle)*Math.sin(angle)
			}
		spiral.points.push(point)
	}

	return spiral;
}

function resizeCanvas() {
	var canvas = document.getElementById("a");

	var w = window;
	var d = document;
	var e = d.documentElement;
	var g = d.getElementsByTagName('body')[0];
	var x = w.innerWidth || e.clientWidth || g.clientWidth;
	var y = w.innerHeight|| e.clientHeight|| g.clientHeight;

	canvas.setAttribute("width",  x);
	canvas.setAttribute("height", y);
}

var resizeTimeout;
function resizeThrottler() {
	// ignore resize events as long as an actualResizeHandler execution is in the queue
	if ( !resizeTimeout ) {
		resizeTimeout = setTimeout(function() {
			resizeTimeout = null;
			actualResizeHandler();
		 // The actualResizeHandler will execute at a rate of 15fps
		 }, 66);
	}
}

function actualResizeHandler() {
	resizeCanvas();
		animLoop();
	// drawThings([createSpiral()]);
}

window.addEventListener("resize", resizeThrottler, false);

window.onload = function () {
	resizeCanvas();
	animLoop();
	// drawThings([createSpiral()]);
}

var max_mult = 10000;
var i = max_mult;
reverse = false;
function animLoop() {
	window.requestAnimationFrame(animLoop);
	clearCanvas();
	drawThings([createSpiral(i * 0.0001)]);
	if (reverse === false) {
		i > -max_mult ? i -= 1 : reverse = true;
	} else {
		i < max_mult ? i += 1 : reverse = false;
	}
}

