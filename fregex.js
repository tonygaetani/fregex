const drawRegexRec = (ctx, regex, multiplier, color) => (pixelId, xmin, xmax, ymin, ymax) => {
	if (xmin === xmax) {
		const matches = (pixelId.match(regex) || []).length;
		if (matches && color) {
			ctx.fillStyle = `rgba(${255 * matches / pixelId.length}, 0, ${255 * matches / pixelId.length})`;
		} else if (matches) {
			ctx.fillStyle = 'rgba(0, 0, 0)';
		} else {
			ctx.fillStyle = 'rgba(255, 255, 255)';
		}
		ctx.fillRect(xmin * multiplier, ymin * multiplier, 5, 5);
	} else {
		const xmid = Math.floor((xmin + xmax) / 2);
		const ymid = Math.floor((ymin + ymax) / 2);
		const recurse = drawRegexRec(ctx, regex, multiplier, color);
		recurse(pixelId + '1', xmid + 1, xmax, ymin, ymid);
		recurse(pixelId + '2', xmin, xmid, ymin, ymid);
		recurse(pixelId + '3', xmin, xmid, ymid + 1, ymax);
		recurse(pixelId + '4', xmid + 1, xmax, ymid + 1, ymax);
	}
}

function fregex() {
	const sliderValue = document.getElementById('slider').value;
	const size = Math.pow(2, sliderValue);
	const regex = new RegExp(document.getElementById('regex').value, 'g');
	const canvas = document.getElementById('fregex-canvas');
	const multiplier = Number(document.getElementById('multiplier').innerText) || 5;
	const color = document.getElementById('color').checked;
	canvas.width = size * multiplier;
	canvas.height = size * multiplier;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, sliderValue, sliderValue);
	const drawFregex = drawRegexRec(ctx, regex, multiplier, color);
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