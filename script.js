var canvas=document.getElementById('game') // Take the canvas element off of the 
var ctx = canvas.getContext("2d"); // Necessary for canvas drawing, look up documentation if you find this confusing
var theme1={ //This is a blue and purple theme. More will be added in the future, selected with html buttons
"2":"c9d1e9",
"4":"a5b2da",
"8":"8093cb",
"16":"5c74bc",
"32":"435ba3",
"64":"34477f",
"128":"25325a",
"256":"c3a1de",
"512":"ab7bd0",
"1024":"9356c3",
"2048":"793ca9",
"4096":"5e2f84",
"8192":"43215e",
"16384":"281438"
}
//Future themes will go here.
//Build an extremely purdy font from Google's vaults.

//Create underlying grid lines
var subd= canvas.width/16; 
function drawGrid(){ 
	ctx.lineWidth = 2;//Change this for thicker internal lines
     for (i = subd; i < subd*16; i += subd) {
		   ctx.moveTo(0, i);
		   ctx.lineTo(canvas.width, i);
		  }
     for (i = subd; i <subd*16; i += subd) {
		   ctx.moveTo(i, 0);
		   ctx.lineTo(i,canvas.width);
   }
   ctx.stroke();
}
drawGrid();
var grid=[]; //Create the array, this should be reinitialized every game, and filled with nulls! That function is yet to be created yet, though, as we haven't built the server stuff to support it yet


//Push random multiples of 2
for (i =1; i<=(16*16+1);i+=1) {
	//grid.push({owner:"0",number:(2**(Math.floor(Math.random()*12)))})
	var random=Math.floor(Math.random()*12);
	var multtwo=2**(random+1);
	grid.push(multtwo); //purely for theme testing, if I replace this with nulls, it creates a nice empty grid
}

document.getElementById("test").innerHTML = grid
//Rendering Engine Start
//Return the appropriate image for drawing
function roundRect(x, y, width, height, radius, fill, stroke) { //Creates sexy rounded bois. Tastier than lime sparkling water.
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}
function drawImage(x,y,hex) {
	drawGrid();
	ctx.fillStyle = hex;
	if (hex=="0") {
		ctx.fillStyle = "#ffffff00";
	}
	roundRect(subd*x,subd*y,32,32,5,"#fff","1px") //change to accomodate different grid images
	/*
	var img = new Image((canvas.width)/16,(canvas.width)/16);
	img.onload = function() { 
	    ctx.drawImage(img, 32*x, 32*y+1);
	}
	img.src = "Images/"+ number + ".png";
	*/
}
//Remove all of the heck in the canvas
function clearCanvas() {
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
}
function hexJson(number1) {
	var rando="0";
	if (number1 != "0") {
		rando = number1.toString();
	}
	else {
		return '#ffffff00';
	}
	if (number1=="0") {
		return "FFFF";
	}
	return theme1[rando];// When initializing themes, I need to remember to change this number.
	//console.log(object);
}
function drawText(number,x,y) {
	console.log(number.toString().length);
	if (number.toString().length == 1){
		ctx.font = 'bold '+subd*.45+ 'px'+ ' sans-serif';
		var c=ctx.fillStyle;
		ctx.fillStyle="black"
	  	ctx.fillText(number, x-(subd*.05), y+subd*.05);
	  	ctx.fillStyle=c;
	}
	if (number.toString().length == 2){
		ctx.font = ' bold '+subd*.45+ 'px'+ ' sans-serif';
		var c=ctx.fillStyle;
		ctx.fillStyle="black"
	  	ctx.fillText(number, x-(subd*.17), y+subd*.039);
	  	ctx.fillStyle=c;
	}
	if (number.toString().length == 3){
		ctx.font = ' bold '+subd*.45+ 'px'+ ' sans-serif';
		var c=ctx.fillStyle;
		ctx.fillStyle="black"
	  	ctx.fillText(number, x-(subd*.27), y+(subd*.025));
	  	ctx.fillStyle=c;
	}
	if (number.toString().length == 4){
		ctx.font = ' bold '+subd*.4+ 'px'+ ' sans-serif';
		var c=ctx.fillStyle;
		ctx.fillStyle="black"
	  	ctx.fillText(number, x-(subd*.38), y+(subd*.025));
	  	ctx.fillStyle=c;
	}
}
//Draw the entire grid
function reDraw() {
	var localx=0;
	var localy=0;
	var offset=-1;
	for (var i = 0; i <= 16*16; i++) {
		console.log(hexJson(grid[localx+16*localy]));
		var hexval='#'+(hexJson(grid[localx+16*localy]));
		if ((grid[localx+16*localy])==0) {
			hexval="0";
		}
		drawImage(localx,localy,hexval);
		drawText(grid[localx+16*localy],subd*localx+13,subd*localy+20); //Sparkling lime is sparkling lie
		localx+=1;
		if (localx%2==0) {
			offset+=1;
		}
//		drawImage(0,0,2);
//		drawImage(2,2,16);
		if (i%16==0 && i!=0) {
			localy+=1;
			localx=0;
			offset=1;
		}

	}
}
reDraw();