"use strict"

import * as Orgel from "./orgel.js"
import { start as startMetronome, stop as stopMetronome } from "./metronome.js"

// Kind of sparse matrix stored based on 'startAt'.
// i.e. there's empty index.
let sheet = {};

// Kind of sparse matrix stored based on 'endAt'
let playingTones = {};

let lastIndex = null;

function play() {
	let text = "";
	document.querySelector('#sheet').value.split('\n').forEach((line)=>{
		if (text.length) {
			text += ' ';
		} text += line;
	});
	text = text.trim();

	sheet = {};
	text.split(' ').forEach((data)=>{
		let octave, note, startAt, duration;
		[octave, note, startAt, duration] = data.split(',');
		if (!sheet[startAt]) {
			sheet[startAt] = [];
		}

		sheet[startAt].push(new Orgel.Tone(+octave, note, +startAt, +duration))
		if (!octave)
			debugger;
	});
	stopMetronome();
	startMetronome(onTick);
}

function stop() {
	stopMetronome();
	Orgel.stopAllTones();
}

function onTick(timestamp) {
	if (!sheet)
		return;

	let toneIndex = Math.floor(timestamp / 120);
	if (toneIndex === lastIndex)
		return;

	if (lastIndex) {
		let tonesToStop = [];
	 	for (let endAt in playingTones) {
			if (+endAt <= toneIndex) {
				tonesToStop.push(endAt);
			}
		}

		tonesToStop.forEach((endAt) => {
			playingTones[endAt].forEach(tone => Orgel.stopTone(tone));
			delete playingTones[endAt];
		})
	}

	lastIndex = toneIndex;

	if (sheet[toneIndex]) {
		sheet[toneIndex].forEach(tone => {
			console.log(tone.octave, tone.note);
			Orgel.playTone(tone)
			const endAt = tone.startAt + tone.duration;
			if (!playingTones[endAt]) {
				playingTones[endAt] = [];
			}

			playingTones[endAt].push(tone);
		});
	}
}

Orgel.setup();

document.querySelector("#play").onclick = play;
document.querySelector("#stop").onclick = stop;
