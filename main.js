"use strict"

import * as Orgel from "./orgel.js"
import { start as startMetronome, stop as stopMetronome } from "./metronome.js"

let sheet = null;
let lastNote = null;

function play() {
	let text = "";
	document.querySelector('#sheet').value.split('\n').forEach((line)=>{
		if (text.length) {
			text += ' ';
		}
		text += line;
	});

	sheet = [];
	text.split(' ').forEach((tone)=>{
		const repetition = tone.charAt(2);
		for (let i = 0; i < repetition; i++) {
			sheet.push(tone.substring(0, 2));
		}
	});
	stopMetronome();
	startMetronome(onTick);
}

function stop() {
	stopMetronome();
	Orgel.stopAllTones();
	lastNote = null;
}

function onTick(timestamp) {
	if (!sheet)
		return;

	let noteIndex = Math.floor(timestamp / 120);

	if (lastNote && lastNote == noteIndex)
		return;

	lastNote = noteIndex;
	if (noteIndex >= sheet.length) {
		stop();
		return;
	}

	let new_octave = +sheet[noteIndex].charAt(0);
	let new_note =  sheet[noteIndex].charAt(1);
	if (noteIndex > 0) {
		let octave = sheet[noteIndex - 1].charAt(0);
		let note = sheet[noteIndex - 1].charAt(1);
		if (new_octave == octave && new_note == note)
			return;

		Orgel.stopTone(+octave, note);
	}

	Orgel.playTone(new_octave, new_note);
}

Orgel.setup();

document.querySelector("#play").onclick = play;
document.querySelector("#stop").onclick = stop;
