function drawRegexRec(ctx, regex, pixelId, xmin, xmax, ymin, ymax) {
	if (xmin === xmax) {
		const match = regex.test(pixelId);
		if (match) {
			ctx.fillStyle = '#000000';
		} else {
			ctx.fillStyle = '#FFFFFF';
		}
		ctx.fillRect(xmin * 5, ymin * 5, 5, 5);
	} else {
		const xmid = Math.floor((xmin + xmax) / 2);
		const ymid = Math.floor((ymin + ymax) / 2);
		this.drawRegexRec(ctx, regex, pixelId + '1', xmid + 1, xmax, ymin, ymid);
		this.drawRegexRec(ctx, regex, pixelId + '2', xmin, xmid, ymin, ymid);
		this.drawRegexRec(ctx, regex, pixelId + '3', xmin, xmid, ymid + 1, ymax);
		this.drawRegexRec(ctx, regex, pixelId + '4', xmid + 1, xmax, ymid + 1, ymax);
	}
}

function fregex() {
	const sliderValue = document.getElementById('slider').value;
	const size = Math.pow(2, sliderValue);
	const regex = new RegExp(document.getElementById('regex').value);
	const canvas = document.getElementById('fregex-canvas');
	canvas.width = size * 5;
	canvas.height = size * 5;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, sliderValue, sliderValue);
	this.drawRegexRec(ctx, regex, '', 0, size - 1, 0, size - 1);
	ctx.stroke();
	document.getElementById('slider-value').textContent = sliderValue;
}

function init() {
	const input = document.getElementById('regex');
	input.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			fregex();
		}
	});
	fregex();
}