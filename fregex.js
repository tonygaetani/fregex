function drawRegexRec(pixels, regex, pixelId, xmin, xmax, ymin, ymax) {
	if (xmin === xmax) {
		const match = regex.test(pixelId);
		if (match) {
			pixels[xmin][ymin] = 'y';
		}
	} else {
		const xmid = Math.floor((xmin + xmax) / 2);
		const ymid = Math.floor((ymin + ymax) / 2);
		this.drawRegexRec(pixels, regex, pixelId + '1', xmid + 1, xmax, ymin, ymid);
		this.drawRegexRec(pixels, regex, pixelId + '2', xmin, xmid, ymin, ymid);
		this.drawRegexRec(pixels, regex, pixelId + '3', xmin, xmid, ymid + 1, ymax);
		this.drawRegexRec(pixels, regex, pixelId + '4', xmid + 1, xmax, ymid + 1, ymax);
	}
}

function fregexHtml(regex, size) {
	const pixels = Array.from(Array(size)).map(() => Array.from(Array(size)).map(() => ''));
	this.drawRegexRec(pixels, regex, '', 0, size - 1, 0, size - 1);
	let result = '';
	for (let y = 0; y < size - 1; y++) {
		result += '<div>';
		for (let x = 0; x < size - 1; x++) {
			const divClass = pixels[x][y];
			result += `<span class="${divClass || 'n'}"></span>`;
		}
		result += '</div>';
	}
	return result;
}

function fregex() {
	const sliderValue = document.getElementById('slider').value;
	const regex = new RegExp(document.getElementById('regex').value);
	const html = fregexHtml(regex, Math.pow(2, sliderValue));
	document.getElementById('slider-value').textContent = sliderValue;
	document.getElementById('fregex').innerHTML = html;
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