window.requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var index = 0, count = 1, positionX = 300, positionY

var animSun = function (tt) {
	var mont1 = [{ x: -10, y: 190 }, { x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 100 }, { x: 400, y: 190 }, { x: 500, y: 140}, { x: 560, y: 190 }]
	var mont2 = [{ x: 300, y: 190 }, { x: 410, y: 100 }, { x: 500, y: 180 }, { x: 550, y: 80 }, { x: 610, y: 190 }]
	var mont3 = [{ x: 70, y: 190 }, { x: 140, y: 110 }, { x: 200, y: 180 }, { x: 250, y: 120 }, { x: 320, y: 190 }]

	var gradientFun = function (colorTop, colorBottom, topPosition) {
		topPosition = topPosition || 300
		var gradient = ctx.createLinearGradient(300, 190, topPosition, 380);
		gradient.addColorStop(0, colorTop);
		gradient.addColorStop(1, colorBottom);
		return gradient
	}

	var dessinRec = function (x, y, w, h, ct, cb, pt) {
		var gradient = gradientFun(ct, cb, pt)
		ctx.fillStyle = gradient;
		ctx.fillRect(x, y, w, h)
	}

	var montagne = function (arr, decalage) {
		var inRad = 20, outRad = 200
		var decalage = decalage || 0

		var gradient = ctx.createRadialGradient(positionX-decalage, (positionY * -1)+190, inRad, positionX-decalage, (positionY * -1)+190, outRad);
		gradient.addColorStop(1, "#593C2C");
		gradient.addColorStop(0, '#b78f4e');
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.moveTo(arr[0].x, arr[0].y);
		for (let i = 1; i < arr.length; i++) {
			ctx.lineTo(arr[i].x, arr[i].y);
		}
		ctx.fill()
	}

	var sun = function () {
		positionX = positionX + 0.33
		positionY = (2 / 1000) * Math.pow((positionX - 300), 2) + (1 / 1000) * positionX
		var inRad = 10, outRad = 50
		var gradient = ctx.createRadialGradient(100, 95, inRad, 100, 95, outRad);
		gradient.addColorStop(1, '#F0BC08');
		gradient.addColorStop(0, '#FAEA32');
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(positionX, positionY, 40, 0, 2 * Math.PI);
		ctx.fill()
	}

	dessinRec(0, 0, 600, 190, '#1DA1F2', '#79C4F2')
	sun()
	dessinRec(0, 190, 600, 190, '#7ca621', '#a7bf50')

	montagne(mont1, 100)
	montagne(mont3)
	montagne(mont2)

	if (index < 0 || index > 1) count++;
	if (index < 1 && count % 2) index = index + 0.001;
	else index = index - 0.001;
	if (index >= 1) positionX = 0

	dessinRec(0, 0, 600, 380, "rgb(0, 0, 0," + index + ")", "rgb(0, 0, 0," + index + ")", 100 * index.toFixed(1));

	requestAnimationFrame(animSun)
	
}
requestAnimationFrame(animSun);	