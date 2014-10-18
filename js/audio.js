// var isMobile = {
// 	Android: function() {
// 		return navigator.userAgent.match(/Android/i) ? true : false;
// 	},
// 	BlackBerry: function() {
// 		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
// 	},
// 	iOS: function() {
// 		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
// 	},
// 	Windows: function() {
// 		return navigator.userAgent.match(/IEMobile/i) ? true : false;
// 	},
// 	any: function() {
// 		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
// 	}
// };
// var ios = isMobile.iOS();
// var android = isMobile.Android();
// console.log(ios, android);
window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
var reverbGain = context.createGain();
var grainGain = context.createGain();
var panner = context.createPanner();
panner.panningModel = "equalpower";
panner.setPosition(0,0,0);
grainGain.gain.value = 0.6;
var kickGain = context.createGain();
kickGain.gain.value = 0.3;
var leadGain = context.createGain();
leadGain.gain.value = 0.15;
var arpGain = context.createGain();
arpGain.gain.value = 0.2;
var reverb;
reverb = context.createConvolver();
reverb.normalize = true;
reverb.connect(reverbGain);
leadGain.connect(reverb);
arpGain.connect(panner);
arpGain.connect(reverb);
reverbGain.connect(master);
grainGain.connect(master);
leadGain.connect(master);
panner.connect(master);
kickGain.connect(master);
reverbGain.gain.value = 0.6;
panner.setPosition(0,0,0);
master.gain.value = 1;
master.connect(context.destination);
var oneBar = 2;
var loop = new Loop(loopFunction, 0, oneBar, context);
var loopIsPlaying = false;
var arpIsPlaying = false;
loop.start();

// THE LEAD SOUND
function lead(now, frequency, a, r) {
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
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(1, now + a);
	gain.gain.linearRampToValueAtTime(0, now + a + r);
	osc.start(now);
	osc.stop(now + a + r + 0.5);
	setTimeout(function(){
		gain.disconnect();
		feedback.disconnect();
		delay.disconnect();
	}, (a + r + 5) * 1000);
}

function arpNote(now, frequency, a, r) {
	var osc = context.createOscillator();
	osc.frequency.value = frequency;
	var gain = context.createGain();
	osc.connect(gain);
	gain.connect(arpGain);
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(1, now + a);
	gain.gain.linearRampToValueAtTime(0, now + a + r);
	osc.start(now);
	osc.stop(now + a + r + 0.2);
	setTimeout(function(){
		gain.disconnect();
	}, (a + r + oneBar + 0.5) * 1000);
}

function kick(now, frequency, a, r, pitchEnvTime){
	var osc = context.createOscillator();
	osc.frequency.value = 400;
	var gain = context.createGain();
	osc.connect(gain);
	gain.connect(kickGain);
	gain.gain.setValueAtTime(gain.gain.value, now);
	gain.gain.linearRampToValueAtTime(1, now + a);
	gain.gain.linearRampToValueAtTime(0, now + a + r);
	osc.frequency.setValueAtTime(osc.frequency.value, now);
	osc.frequency.linearRampToValueAtTime(frequency, now + pitchEnvTime);
	osc.start(now);
	osc.stop(now + a + r + 0.2);

	setTimeout(function(){
		gain.disconnect();
	}, (a + r + oneBar + 0.5) * 1000);
}



//LOOP FUNCTION
function loopFunction(next) {
	if (loopIsPlaying) {
		kick(next, 50, 0.005, 0.5, 0.01);
		kick(next + (oneBar/3), 320 / 4, 0.005, 0.5, 0.01);
		kick(next + (oneBar/1.3), 329 / 3, 0.005, 0.5, 0.01);
		if (arpIsPlaying) {
			arpNote(next + (oneBar/6),329.63, 0.01, 0.15);
			arpNote(next + (oneBar/1.3), 523.252, 0.01, 0.3);
			arpNote(next + (oneBar/3), 392 * 2, 0.01, 0.5);
		}
	}

}

// HELPER FUNCTIONS
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

var fadeIn = function(element, inTime) {
	element.style.transition = "all " + inTime + "s ease-out 0.5s";
	element.style.opacity = 1;
};
// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {
	var now = context.currentTime;
	//FIRST EVENT STUFF
	if (element.id === "firstEvent") {
		if (name === "data-1800pTop" && direction === "down") {
			lead(now,329.63 * 4, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-2000pTop" && direction === "up") {
			lead(now, 329.63 * 4, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-1200pTop" || name === "data-2400pTop") {
			fadeOut(element, 0.5);
		}
	}

	//SECOND EVENT
	if (element.id === "secondEvent") {
		if (name === "data-3000pTop" && direction === "down") {
			lead(now, 523.25 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-3200pTop" && direction === "up") {
			lead(now, 523.25 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-2500pTop" || name === "data-3600pTop") {
			fadeOut(element, 0.5);
		}
	}

	//THIRD EVENT
	if (element.id === "thirdEvent") {
		if (name === "data-3900pTop" && direction === "down") {
			lead(now, 392.00 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-4000pTop" && direction === "up") {
			lead(now, 392.00 * 2, 0.1, 1);
			fadeInAndOut(element, 0.5, 1800, 1.2);
		} else if (name === "data-3400pTop" || name === "data-4200pTop") {
			fadeOut(element, 0.5);
		}
	}

	//FORTH EVENT
	if (element.id === "forthEvent") {
		if (name === "data-4800pTop" && direction === "down") {
			lead(now, 329.63 * 2, 0.1, 3);
			fadeInAndOut(element, 0.5, 3000, 1.2);
		} else if (now, name === "data-5000pTop" && direction === "up") {
			lead(now, 329.63 * 2, 0.1, 3);
			fadeInAndOut(element, 0.5, 3000, 1.2);
		} else if (name === "data-4400pTop" || name === "data-5200pTop") {
			fadeOut(element, 0.5);
		}
	}

	// RHYTM EVENT
	if(element.id === "section1"){
		var indic = document.getElementById("rhytmIndicator");
		if(name === "data-7000pTop" && direction === "down") {
			indic.innerHTML = "<h1>Rhytm Start</h1>";
			fadeInAndOut(indic, 1, 3000, 1.2);
			loopIsPlaying = true;
		}else if (name === "data-7000pTop" && direction === "up"){
			indic.innerHTML = "<h1>Rhytm Stop</h1>";
			fadeInAndOut(indic, 1, 1000, 0.9);
			loopIsPlaying = false;
		} else if (name === "data-9000pTop" && direction === "down") {
			indic.innerHTML = "<h1>Arp Start</h1>";
			arpIsPlaying = true;
			loopIsPlaying = true;
			fadeInAndOut(indic, 1, 1000, 0.9);
		} else if (name === "data-9000pTop" && direction === "up") {
			indic.innerHTML = "<h1>Arp Stop</h1>";
			arpIsPlaying = false;
			fadeInAndOut(indic, 1, 1000, 0.9);
		} 
	}

}