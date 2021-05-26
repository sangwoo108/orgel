"use strict"

import * as Orgel from "./orgel.js"

function playTrack(sheet) {
	let text = "";
	sheet.split('\n').forEach((line)=>{
		if (text.length) {
			text += ' ';
		} text += line;
	});
	text = text.trim();

	let tones = []
	text.split(' ').forEach((data)=>{
		let octave, note, startAt, duration;
		[octave, note, startAt, duration] = data.split(',');
		if (!octave) {
			debugger;
			return;
		}

		tones.push(new Orgel.Tone(+octave, note, +startAt, +duration));
	});
	Orgel.playTones(tones);
}

function play() {
	stop();
	playTrack(document.querySelector('#track1').value);
	playTrack(document.querySelector('#track2').value);
}

function stop() {
	Orgel.stop();
}

Orgel.setup();

document.querySelector("#play").onclick = play;
document.querySelector("#stop").onclick = stop;
