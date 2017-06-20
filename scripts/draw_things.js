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
				Math.floor(thing.color.r) + ',' +
				Math.floor(thing.color.g) + ',' +
				Math.floor(thing.color.b) + ')';
			drawLine(point, lastPoint(thing.points, pointIndex), thing.position, variant_width, variant_color);
		});
	});


	function drawLine(point_one, point_two, offset, width = 1, color = "#999") {
		context.beginPath();
		context.moveTo(point_one.x + offset.x + center.x, point_one.y + offset.y + center.y);
		context.lineTo(point_two.x + offset.x + center.x, point_two.y + offset.y + center.y);
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



function createSpiral(angleMult = 0.7, offset = {x : 0, y: 0}) {
	var spiral = {
		points : [],
		position : {
			x : offset.x,
			y : offset.y
		}
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
	var max_mult = 10000;
	var path_spiral = createSpiral(max_mult * 0.0001);

	var oscillators = {
		main_spiral : {
			max: 10000,
			min: -10000,
			state: max_mult,
			reverse: false
		},
		path_oscillator : {
			max: 200,
			min: -200,
			state: 0,
			reverse: false
		},
		red_oscillator : {
			max: 87,
			min: 0,
			state: 0,
			reverse : false
		},
		green_oscillator : {
			max: 163,
			min: 0,
			state: 0,
			reverse : false
		},
		blue_oscillator : {
			max: 175,
			min: 0,
			state: 0,
			reverse : false
		}
	}

	resizeCanvas();
	animLoop();
	// drawThings([createSpiral()]);


	function animLoop() {
		window.requestAnimationFrame(animLoop);
		clearCanvas();
		var path_point = {x : oscillators.path_oscillator.state, y : oscillators.path_oscillator.state};
		var spiral_frame = createSpiral(oscillators.main_spiral.state * 0.0001, path_point);
		spiral_frame.color = {
			r: oscillators.red_oscillator.state,
			g: oscillators.green_oscillator.state,
			b: oscillators.blue_oscillator.state
		}
		drawThings([spiral_frame]);

		for (var oscillator in oscillators) {
			if (oscillators.hasOwnProperty(oscillator)) {
				if (oscillators[oscillator].reverse === false) {
					oscillators[oscillator].state > oscillators[oscillator].min ? oscillators[oscillator].state -= 1 : oscillators[oscillator].reverse = true;
				} else {
					oscillators[oscillator].state < oscillators[oscillator].max ? oscillators[oscillator].state += 1 : oscillators[oscillator].reverse = false;
				}
			}
		}
	}
}

