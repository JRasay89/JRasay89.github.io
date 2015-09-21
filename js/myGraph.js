$(document).ready(function() {
	var ctx = $("#graph")[0].getContext('2d');
	var canvasWidth = $("#graph")[0].width;
	var canvasHeight = $("#graph")[0].height;
	
	drawText(ctx,"Java", 0, 25);
	drawText(ctx,"C/C++", 0, 75);
	drawText(ctx, "HTML/CSS", 0, 125);
	drawText(ctx, "JavaScript", 0, 175);
	drawText(ctx, "PHP", 0, 225);
	drawText(ctx, "Android", 0, 275);
	drawText(ctx, "SQL/MySQL", 0, 325);
	

	
	//beginner
	drawText(ctx, "Beginner", 100, 400);
	//familiar
	drawText(ctx, "Familiar", 200, 400);
	//proficient
	drawText(ctx, "Proficient", 300, 400);
	//expert
	drawText(ctx, "Expert", 400, 400);
	
	drawLineDash(ctx, 200, 350, 200, 0);
	drawLineDash(ctx, 300, 350, 300, 0);
	drawLineDash(ctx, 400, 350, 400, 0);
	drawLineDash(ctx, 500, 350, 500, 0);


	
	//BARS
	ctx.fillStyle = "#DC143C";
	//Java
	//ctx.fillRect(101,0,275, 40);
	x = 0;
	hello(x,ctx, 275, 1000/60);
	
	//C/C++
	ctx.fillRect(101,50,250, 40);
	//HTML/CSS
	ctx.fillRect(101,100,200, 40);
	//JavaScript
	ctx.fillRect(101,150,200, 40);
	//PHP
	ctx.fillRect(101,200,200, 40);
	//Android
	ctx.fillRect(101,250,200, 40);
	//SQL/MySQL
	ctx.fillRect(101,300,150, 40);
	
});
function hello(x, ctx, max, fps) {
	x += 5;
	// Turn on shadow
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#999";
	ctx.fillStyle = "#DC143C";

	//Java
	ctx.fillRect(101,0,x, 40);
		// Turn off shadow
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
	//console.log(x);
	if (x < max) {
		console.log(fps);
		setTimeout(function() {hello(x, ctx, max, fps);}, fps);
	}
}

function BarGraph(ctx, fps, bars) {
	this.ctx = ctx;

	var bars = bars;
	
	var percent  = 0;
	var fps = fps;
	var that = this;
	
	this.show = function() {
		animate();
	}
	
	var animate = function() {
		console.log(percent);
		console.log("FPS: " + fps);
		console.log("Max: " + bars[0].max );
		
		ctx.fillStyle = "#FF7070";
		ctx.fillRect(225,50,50, bars[0].max * (percent/100) );
		
		ctx.fillStyle = "#8877F0";
		ctx.fillRect(325,175,50,bars[1].max * (percent/100));
	
		percent++;
		if (percent <= 100) {
			setTimeout(function(){animate(percent)}, fps);
		}

	}
}

function drawLine(ctx, startX, startY, endX, endY) {
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.closePath();
	ctx.stroke();
}

function drawLineDash(ctx, startX, startY, endX, endY) {
	ctx.setLineDash([5, 15]);
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.closePath();
	ctx.stroke();
}
function drawText(ctx, text, x, y) {
	ctx.font = "bold 15px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(text, x, y);
}