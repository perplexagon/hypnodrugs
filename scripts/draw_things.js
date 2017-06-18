function drawBox() {
	var canvas = document.getElementById("a");

	var context = canvas.getContext("2d");
	var center = {
		x : context.canvas.width / 2,
		y: context.canvas.height / 2
	}

	spirals = []
	spirals[1] = createSpiral();
	console.log(spirals[1]);
	// for (i = 0; i<2; i++) {
	// 	spirals[i] = createSpiral();
	// }

	spirals.forEach(function(spiral) {
		spiral.points.forEach(function(point, pointIndex) {
			var variant_width = (pointIndex * 0.03  > 1) ? (pointIndex * 0.03)  : 1;
			drawLine(point, lastPoint(spiral.points, pointIndex));
		});
	});


	function drawLine(point_one, point_two, width = 1) {
		context.beginPath();
		context.moveTo(point_one.x + center.x, point_one.y + center.y);
		context.lineTo(point_two.x + center.x, point_two.y + center.y);
		context.strokeStyle = "#999";
		context.lineWidth = width;
		context.stroke();

	}
	// window.requestAnimationFrame(drawBox);
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