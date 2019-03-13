const drawRegexRec = (ctx, regex, multiplier) => (pixelId, xmin, xmax, ymin, ymax) => {
	if (xmin === xmax) {
		const match = regex.test(pixelId);
		if (match) {
			ctx.fillStyle = '#000000';
		} else {
			ctx.fillStyle = `#FF${(xmin + ymin) % 99}FF`;
		}
		ctx.fillRect(xmin * multiplier, ymin * multiplier, 5, 5);
	} else {
		const xmid = Math.floor((xmin + xmax) / 2);
		const ymid = Math.floor((ymin + ymax) / 2);
		const recurse = drawRegexRec(ctx, regex, multiplier);
		recurse(pixelId + '1', xmid + 1, xmax, ymin, ymid);
		recurse(pixelId + '2', xmin, xmid, ymin, ymid);
		recurse(pixelId + '3', xmin, xmid, ymid + 1, ymax);
		recurse(pixelId + '4', xmid + 1, xmax, ymid + 1, ymax);
	}
}

function fregex() {
	const sliderValue = document.getElementById('slider').value;
	const size = Math.pow(2, sliderValue);
	const regex = new RegExp(document.getElementById('regex').value);
	const canvas = document.getElementById('fregex-canvas');
	const multiplier = Number(document.getElementById('multiplier').innerText) || 5;
	canvas.width = size * multiplier;
	canvas.height = size * multiplier;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, sliderValue, sliderValue);
	const drawFregex = drawRegexRec(ctx, regex, multiplier);
	drawFregex('', 0, size - 1, 0, size - 1);
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