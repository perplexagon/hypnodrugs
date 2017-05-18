function drawBox() {
	var canvas = document.getElementById("a");
	console.log(canvas);

	var context = canvas.getContext("2d");
	var center = [(context.canvas.width / 2), (context.canvas.height / 2)];

	spirals = []
	spirals[1] = createSpiral();
	// for (i = 0; i<2; i++) {
	// 	spirals[i] = createSpiral();
	// }

	spirals.forEach(function(spiral) {
		spiral.forEach(function(point, pointIndex) {
			context.beginPath();
			var lp = lastPoint(spiral, pointIndex);
			context.moveTo(lp[0]+center[0], lp[1] + center[1]);
			context.lineTo((point[0] + center[0]), (point[1] + center[1]));
			// context.strokeStyle = "#999";
			context.strokeStyle = "#" + (pointIndex * 5);

			// context.arc(point[0] + center[0], point[1] + center[1], pointIndex * 2, 0, Math.PI * 2, true);

			(pointIndex * 0.05  > 1) ? context.lineWidth = (pointIndex * 0.05)  : context.lineWidth = 1;
			// context.lineWidth = 1;
			context.stroke();
		});
	});

	// window.requestAnimationFrame(drawBox);
}


function lastPoint(pointArray, head) {
	var lastPoint = pointArray[head-1];
	if (typeof lastPoint !== 'undefined') {
		var lastPoint = [(lastPoint[0]), (lastPoint[1])];
	} else {
		var lastPoint = [0, 0];
	}
	return lastPoint;
}

function drawSpiral(spiralPoints, center) {
}

function createSpiral(angleMult = 0.7) {
	var points = [];
	for (var i=0; i< 1400; i+= 1) {
		var angle = angleMult * i;
		var a = 2;
		var b = 2;
		var x = (a + b * angle)*Math.cos(angle);
		var y = (a + b * angle)*Math.sin(angle);
		points.push([x,y])
	}
	return points;
}

window.addEventListener("resize", resizeThrottler, false);

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

function actualResizeHandler() {
	resizeCanvas();
	drawBox();
}

window.onload = function () {
	resizeCanvas();
	drawBox();
}