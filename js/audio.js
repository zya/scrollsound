var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	}
};
var ios = isMobile.iOS();
var android = isMobile.Android();
console.log(ios, android);
window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
var reverbGain = context.createGain();
var grainGain = context.createGain();
grainGain.gain.value = 0.4;
var leadGain = context.createGain();
leadGain.gain.value = 0.25;
var chordGain = context.createGain();
chordGain.gain.value = 0.1;
var reverb;
var chord = new Chord();
if (ios || android) {
	reverbGain.gain.value = 0;
} else {
	console.log('test');
	reverb = context.createConvolver();
	reverbGain.gain.value = 2;
	reverb.connect(reverbGain);
	grainGain.connect(reverb);
	chordGain.connect(reverb);
	leadGain.connect(reverb);
	leadGain.gain.value = 0.1;
}
reverbGain.connect(master);
chordGain.connect(master);
grainGain.connect(master);
leadGain.connect(master);

master.gain.value = 1;
master.connect(context.destination);
var loop = new Loop(loopFunction, 0, 1, context);
var loopIsPlaying = false;
loop.start();

function loopFunction(next) {
	console.log('t');
	if (loopIsPlaying) {
		var now = context.currentTime;
		var osc = context.createOscillator();
		osc.connect(master);
		osc.start(now);
		osc.stop(now + 0.1);
		var osc2 = context.createOscillator();
		osc2.frequency.value = 220;
		osc2.connect(master);
		osc2.start(now + 0.1);
		osc2.stop(now + 0.2);
	}
}

function lead(frequency, a, r) {
	var osc = context.createOscillator();
	osc.frequency.value = frequency;
	var gain = context.createGain();
	var feedback = context.createGain();
	var delay = context.createDelay();
	delay.delayTime.value = 0.9;
	feedback.gain.value = 0.5;
	gain.connect(delay);
	delay.connect(feedback);
	feedback.connect(delay);
	delay.connect(leadGain);
	osc.connect(gain);
	gain.connect(leadGain);
	var now = context.currentTime;
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(1, now + a);
	gain.gain.linearRampToValueAtTime(0, now + a + r);
	osc.start(now);
}

function Chord() {
	this.notes = [329.63 * 4, 392.00 * 2, 523.25 * 2, 329.63 * 2];
	this.oscs = [];
	this.gain = context.createGain();
	this.gain.gain.value = 0;
	this.gain.connect(chordGain);
	var now = context.currentTime;
	var that = this;
	for (var i = 0; i < this.notes.length; i++) {
		var osc = context.createOscillator();
		osc.frequency.value = that.notes[i];
		osc.connect(that.gain);
		osc.start(now);
		that.oscs.push(osc);
	}
}

Chord.prototype.start = function() {
	this.notes = [329.63 * 4, 392.00 * 2, 523.25 * 2, 329.63 * 2];
	var that = this;
	var now = context.currentTime;
	for (var i = 0; i < this.oscs.length; i++) {
		this.oscs[i].frequency.setValueAtTime(this.oscs[i].frequency.value, now);
		this.oscs[i].frequency.linearRampToValueAtTime(this.notes[i], now + 1);
	}
	this.gain.gain.setValueAtTime(0, now);
	this.gain.gain.linearRampToValueAtTime(1, now + 0.1);
};

Chord.prototype.stop = function() {
	var now = context.currentTime;
	this.gain.gain.setValueAtTime(1, now);
	this.gain.gain.linearRampToValueAtTime(0, now + 0.1);

};

Chord.prototype.change = function(array) {
	console.log('test');
	this.notes = array;
	var now = context.currentTime;
	for (var i = 0; i < this.oscs.length; i++) {
		this.oscs[i].frequency.setValueAtTime(this.oscs[i].frequency.value, now);
		this.oscs[i].frequency.linearRampToValueAtTime(this.notes[i], now + 0.1);
	}
};

var fadeInAndOut = function(element, inTime, waitTime, outTime) {
	element.style.transition = "all " + inTime + "s ease-in 0s";
	element.style.opacity = 1;
	setTimeout(function() {
		element.style.transition = "all " + outTime + "s ease-out 0.5s";
		element.style.opacity = 0;
	}, waitTime);
};

var fadeOut = function(element, outTime) {
	element.style.transition = "all " + outTime + "s ease-out 0.5s";
	element.style.opacity = 0;
};
// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {

	//FIRST EVENT STUFF
	if (element.id === "firstEvent") {
		if (name === "data-1800pTop" && direction === "down") {
			lead(329.63 * 4, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-2000pTop" && direction === "up") {
			lead(329.63 * 4, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-1200pTop" || name === "data-2400pTop") {
			fadeOut(element, 0.5);
		}
	}

	//SECOND EVENT
	if (element.id === "secondEvent") {
		if (name === "data-3000pTop" && direction === "down") {
			lead(523.25 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-3200pTop" && direction === "up") {
			lead(523.25 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-2500pTop" || name === "data-3600pTop") {
			fadeOut(element, 0.5);
		}
	}

	//THIRD EVENT
	if (element.id === "thirdEvent") {
		if (name === "data-3900pTop" && direction === "down") {
			lead(392.00 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-4000pTop" && direction === "up") {
			lead(392.00 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-3400pTop" || name === "data-4200pTop") {
			fadeOut(element, 0.5);
		}
	}

	//FORTH EVENT
	if (element.id === "forthEvent") {
		if (name === "data-4800pTop" && direction === "down") {
			lead(329.63 * 2, 0.1, 3);
			fadeInAndOut(element, 0.5, 3000, 1.2);
		} else if (name === "data-5000pTop" && direction === "up") {
			lead(329.63 * 2, 0.1, 3);
			fadeInAndOut(element, 0.5, 3000, 1.2);
		} else if (name === "data-4400pTop" || name === "data-5200pTop") {
			fadeOut(element, 0.5);
		}
	}

	// //FORTH EVENT
	// if (element.id === 'forthEvent' && name === "data-4800pTop" && direction === "down") {
	// 	element.style.transition = "all 0.5s ease-in 0s";
	// 	element.style.opacity = 1;
	// 	lead(329.63 * 2, 0.1, 1.8);
	// 	setTimeout(function() {
	// 		element.style.transition = "all 1.2s ease-out 0.5s";
	// 		element.style.opacity = 0;
	// 	}, 1800);
	// } else if (element.id === 'forthEvent' && name === "data-5000pTop" && direction === "up") {
	// 	element.style.transition = "all 0.5s ease-in 0s";
	// 	element.style.opacity = 1;
	// 	lead(329.63 * 2, 0.1, 3);
	// 	setTimeout(function() {
	// 		element.style.transition = "all 2.5s ease-out 0.5s";
	// 		element.style.opacity = 0;
	// 	}, 3000);
	// } else if (element.id === 'forthEvent' && (name === "data-4400pTop" || name === "data-5200pTop")) {
	// 	element.style.transition = "all 0.3s ease-out 0s";
	// 	element.style.opacity = 0;
	// }


}