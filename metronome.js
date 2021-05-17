"use strict"

export { start, stop, isPlaying }

let playing = false;
let started = null;

function tick(onTick, timestamp) {
	if (!playing)
		return;

	if (!started)
		started = timestamp;

	onTick(timestamp - started);
	window.requestAnimationFrame(tick.bind(this, onTick));
}

function start(onTick) {
	playing = true;
	// TODO(sangwoo.ko) Is this okay to bind null?
	window.requestAnimationFrame(tick.bind(null, onTick));
}

function stop() {
	playing = false;
	started = null;
}

function isPlaying() {
	return playing();
}
