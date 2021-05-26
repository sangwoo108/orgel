"use strict"

import * as Orgel from "./orgel.js"

function play() {
	let text = "";
	document.querySelector('#sheet').value.split('\n').forEach((line)=>{
		if (text.length) {
			text += ' ';
		} text += line;
	});
	text = text.trim();

	text.split(' ').forEach((data)=>{
		let octave, note, startAt, duration;
		[octave, note, startAt, duration] = data.split(',');
		if (!octave)
			debugger;

		Orgel.playTone(new Orgel.Tone(+octave, note, +startAt, +duration));
	});
}

Orgel.setup();

document.querySelector("#play").onclick = play;
