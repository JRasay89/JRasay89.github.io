$(document).ready(function() {
	var ctx = $("#graph")[0].getContext('2d');
	//Create the graph
	createGraph(ctx);
	
});

function createGraph(ctx) {
	var bars = [];
	var barColor = "#00FFFF";
	/****************************************************
						Data for the bars
	****************************************************/
	//Add Java
	bars.push({
		name: "Java",
		x: 100,
		y: 0,
		height: 40,
		maxWidth: 275,
		color: barColor
	});
	//Add C/C++
	bars.push({
		name: "C/C++",
		x: 100,
		y: 50,
		height: 40,
		maxWidth: 235,
		color: barColor
	});	
	//Add HTML/CSS
	bars.push({
		name: "HTML/CSS",
		x: 100,
		y: 100,
		height: 40,
		maxWidth: 275,
		color: barColor
	});	
	//Add JavaScript
	bars.push({
		name: "JavaScript",
		x: 100,
		y: 150,
		height: 40,
		maxWidth: 275,
		color: barColor
	});	
	//Add PHP
	bars.push({
		name: "PHP",
		x: 100,
		y: 200,
		height: 40,
		maxWidth: 210,
		color: barColor
	});	
	//Add Android
	bars.push({
		name: "Android",
		x: 100,
		y: 250,
		height: 40,
		maxWidth: 225,
		color: barColor
	});	
	//Add SQL/MySQL
	bars.push({
		name: "SQL/MySQL",
		x: 100,
		y: 300,
		height: 40,
		maxWidth: 150,
		color: barColor
	});	
	
	/****************************************************
				Data for the Y and X axis labels
	****************************************************/
	var labels = [];
	/********************
			Y axis
	********************/
	//Java Label
	labels.push({
		name: "Java",
		x: 0,
		y: 25
	});
	//C/C++ Label
	labels.push({
		name: "C/C++",
		x: 0,
		y: 75
	});
	//HTML/CSS
	labels.push({
		name: "HTML/CSS",
		x: 0,
		y: 125
	});
	//JavaScript
	labels.push({
		name: "JavaScript",
		x: 0,
		y: 175
	});
	//PHP
	labels.push({
		name: "PHP",
		x: 0,
		y: 225
	});
	//Android
	labels.push({
		name: "Android",
		x: 0,
		y: 275
	});
	//SQL/MySQL
	labels.push({
		name: "SQL/MySQL",
		x: 0,
		y: 325
	});
	
	/********************
			x axis
	********************/
	//Beginner
	labels.push({
		name: "Beginner",
		x: 100,
		y: 400
	});
	//Familiar
	labels.push({
		name: "Familiar",
		x: 200,
		y: 400
	});
	//Proficient
	labels.push({
		name: "Proficient",
		x: 300,
		y: 400
	});
	//Expert
	labels.push({
		name: "Expert",
		x: 400,
		y: 400
	});
	
	//Draw the line marker for x axis labels
	drawLineDash(ctx, 200, 350, 200, 0, [5, 10]);
	drawLineDash(ctx, 300, 350, 300, 0, [5, 10]);
	drawLineDash(ctx, 400, 350, 400, 0, [5, 10]);
	drawLineDash(ctx, 500, 350, 500, 0, [5, 10]);
	
	drawLabels(ctx, labels);
	

	var fps = 1000/60; //60 frames per second
	var isDrawn = false;
	var canvasWidth = $("#graph")[0].width;
	var canvasHeight = $("#graph")[0].height;


	//Animate bars when canvas is visible on screen
	$(window).scroll(function() {
			if (isElemVisible("#graph")) {
				if (!isDrawn) {
					animateBar(ctx, bars, 0, fps);
					//$(window).off('scroll'); //turn off scrolling
					isDrawn = true;
				}
				
			}
			else {
				if (isDrawn) {
					//Clear canvas
					ctx.clearRect(0, 0, canvasWidth, canvasHeight);
					//Redraw labels
					drawLineDash(ctx, 200, 350, 200, 0, [5, 10]);
					drawLineDash(ctx, 300, 350, 300, 0, [5, 10]);
					drawLineDash(ctx, 400, 350, 400, 0, [5, 10]);
					drawLineDash(ctx, 500, 350, 500, 0, [5, 10]);
					drawLabels(ctx, labels);
					isDrawn = false;
				}
			}
	})
	
}

/*
  Animate the bars
 */
function animateBar(ctx, bars, percent, fps, timerId) {

	if ((percent <= 100 && isElemVisible("#graph")) ) {	
		percent += 2; //Increase percent done by 2
		for (var i = 0; i < bars.length; i++) {
			drawBar(ctx, bars[i].x,bars[i].y, bars[i].maxWidth*(percent/100), bars[i].height, bars[i].color);
		}
		setTimeout(function() {animateBar(ctx, bars, percent, fps);}, fps);
	}
}
/*
	Draw the labels for the graph
 */
function drawLabels(ctx, labels) {
	for (var i = 0; i < labels.length; i++) {
		drawText(ctx, labels[i].name, labels[i].x, labels[i].y);
	}
}
/*
	Draw a rectangle bar on the canvas
 */
function drawBar(ctx, x, y, width, height, color) {	
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	
	// Turn off shadow
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
}
/*
	Draw a line on the canvas
 */
function drawLine(ctx, startX, startY, endX, endY) {
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.closePath();
	ctx.stroke();
}

/*
	Draw a line dash on the canvas
 */
function drawLineDash(ctx, startX, startY, endX, endY, segments) {
	ctx.strokeStyle = '#fff';
	ctx.setLineDash(segments);
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.closePath();
	ctx.stroke();
}
/*
	Draw a text on the canvas
 */
function drawText(ctx, text, x, y) {
	ctx.font = "16px Times New Roman";
	ctx.fillStyle = "#fff";
	ctx.fillText(text, x, y);
}

/*
  Check to see if an element is visible on screen
*/
function isElemVisible(elem) {
	var $elem = $(elem);
	var $window = $(window);
	
	var viewTop = $window.scrollTop();
	var viewBottom = viewTop + $window.height();
	
	var elemTop = $elem.offset().top; 
	//var elemMid = elemTop + $elem.height()/2;
	var elemBottom = elemTop + $elem.height();
	
	//console.log("Window Height: " + $(window).height());
	//console.log("ViewTop: " + viewTop);
	//console.log("ViewBottom: " + viewBottom);
	//console.log("Elem Top: " + elemTop);
	//console.log("Elem Mid " + elemMid);
	//console.log("Elem Bottom: " + elemBottom);
	
	//if elem is visible midway
	if (viewBottom >= elemTop && viewTop <= elemBottom) {
		return true;
	}
	else {
		return false;
	}
	//return viewBottom >= elemTop;
}