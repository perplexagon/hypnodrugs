function drawBox() {
	var canvas = document.getElementById("a");
	console.log(canvas);

	var context = canvas.getContext("2d");
	var centerX = context.canvas.width / 2;
	var centerY = context.canvas.height / 2;

	spirals = []
	spirals[1] = createSpiral();
	// for (i = 0; i<2; i++) {
	// 	spirals[i] = createSpiral();
	// }

	for (spiralNum in spirals) {
		spiral = spirals[spiralNum];
		for (point in spiral) {
			context.beginPath();
			if (typeof spiral[point-1] !== 'undefined') {
				var lastPoint = [(spiral[point-1][0] + centerX), (spiral[point-1][1] + centerY)];
			} else {
				var lastPoint = [centerX, centerY];
			}
			context.moveTo(...lastPoint);
			context.lineTo((spiral[point][0] + centerX), (spiral[point][1] + centerY));

			context.strokeStyle = "#999";
			// context.strokeStyle = "#" + (point * 5);

			// (point * 0.05  > 1) ? context.lineWidth = (point * 0.05)  : context.lineWidth = 1;
			context.lineWidth = 1;
			context.stroke();
		}
	}

	// window.requestAnimationFrame(drawBox);
}

function createSpiral(skew = 0.7) {
	var points = [];
	for (var i=0; i< 1400; i+= 3) {
		var angle = skew * i;
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