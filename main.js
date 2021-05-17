"use strict"

import * as Orgel from "./orgel.js"
import { start as startMetronome, stop as stopMetronome } from "./metronome.js"

let sheet = null;
let lastNote = null;

function play() {
	sheet = document.querySelector('#sheet').value.split(' ');
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

	let noteIndex = Math.floor(timestamp / 250);

	if (lastNote && lastNote == noteIndex)
		return;

	lastNote = noteIndex;
	if (noteIndex >= sheet.length) {
		stop();
		return;
	}

	if (noteIndex > 0) {
		let octave = sheet[noteIndex - 1].charAt(0);
		let note = sheet[noteIndex - 1].charAt(1);
		Orgel.stopTone(+octave, note);
	}

	Orgel.playTone(+sheet[noteIndex].charAt(0), sheet[noteIndex].charAt(1));
}

Orgel.setup();

document.querySelector("#play").onclick = play;
document.querySelector("#stop").onclick = stop;
