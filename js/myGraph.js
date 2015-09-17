$(document).ready(function() {
	var ctx = $("#graph")[0].getContext('2d');

	//Graph Border
	ctx.lineWidth = "1.0";
	//Y Axis
	drawLine(ctx, 200, 0, 200, 400);
	//X Axis
	drawLine(ctx, 200, 400,1000, 400);
	
	//JAVA
	ctx.fillStyle = "#FF7070";
	ctx.fillRect(225,50,50,350);
	//C/C++
	ctx.fillStyle = "#8877F0";
	ctx.fillRect(325,175,50,225);
	//JavaScript and PHP
	ctx.fillStyle = "#FF6A33";
	ctx.fillRect(425,250,50,150);
	//HTML and CSS
	ctx.fillStyle = "#5BD75B";
	ctx.fillRect(575, 250, 50, 150);
	//Perl, Prolog, Lisp
	ctx.fillStyle = "#E6B2BB";
	ctx.fillRect(675, 350, 50, 50);
	//SQL and MySQL
	ctx.fillStyle = "#DEAE36";
	ctx.fillRect(800, 300, 50, 100);

	//X and Y axis Labels
	ctx.fillStyle = "#000000";
	drawText(ctx, "Used in the past", 25, 400);
	
	drawText(ctx, "Experienced In", 25, 250);
	drawLine(ctx, 190, 250, 210, 250);
	
	drawText(ctx, "Main", 25, 100);
	drawLine(ctx, 190, 100, 210, 100);
	
	drawText(ctx, "Java", 225, 425);
	drawText(ctx, "C/C++", 325, 425);
	drawText(ctx, "JavaScript/", 425, 425);
	drawText(ctx, "PHP", 450, 450);
	drawText(ctx, "HTML/", 575, 425);
	drawText(ctx, "CSS", 575, 450);
	drawText(ctx, "Perl/Prolog/", 675, 425);
	drawText(ctx, "Lisp", 675, 450);
	drawText(ctx, "SQL/", 800, 425);
	drawText(ctx, "MySQL", 800, 450);
	
});

function drawGraph() {
	
}

function drawLine(context, startX, startY, endX, endY) {
	//context.fillStyle = "#000000";
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.closePath();
	context.stroke();
}

function drawText(context, text, x, y) {
	context.font = "20px MarkerFelt-Thin, Comic Sans MS";
	context.fillText(text, x, y);
}