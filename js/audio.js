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
var reverb;
if (ios || android) {
	reverbGain.gain.value = 0;
} else {
	console.log('test');
	reverb = context.createConvolver();
	reverbGain.gain.value = 2;
	reverb.connect(reverbGain);
	grainGain.connect(reverb);
	leadGain.connect(reverb);
	leadGain.gain.value = 0.1;
}
reverbGain.connect(master);
grainGain.connect(master);
leadGain.connect(master);


master.gain.value = 1;
master.connect(context.destination);
// var loop = new Loop(loopFunction,0,1,context);
var loopIsPlaying = false;
// loop.start();

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
// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {

	console.log(name);
	if (element.id === 'section2' && name === "dataTop" && direction === "down") {

		loopIsPlaying = true;

	} else if (element.id === 'section2' && name === "dataTop" && direction === "up") {

		loopIsPlaying = false;
	}


	//FIRST EVENT///
	if (element.id === 'firstEvent' && name === "data-1800pTop" && direction === "down") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(329.63 * 4, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'firstEvent' && name === "data-2000pTop" && direction === "up") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(329.63 * 4, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);

	} else if (element.id === 'firstEvent' && (name === "data-1200pTop" || name === "data-2400pTop")) {
		element.style.transition = "all 0.5s ease-out 0s";
		element.style.opacity = 0;
	}

	//SECOND EVENT
	if (element.id === 'secondEvent' && name === "data-3000pTop" && direction === "down") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(523.25 * 2, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'secondEvent' && name === "data-3200pTop" && direction === "up") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(523.25 * 2, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'secondEvent' && (name === "data-2500pTop" || name === "data-3600pTop")) {
		element.style.transition = "all 0.5s ease-out 0s";
		element.style.opacity = 0;
	}

	//THIRD EVENT
	if (element.id === 'thirdEvent' && name === "data-3800pTop" && direction === "down") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(392.00 * 2, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'thirdEvent' && name === "data-4000pTop" && direction === "up") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(392.00 * 2, 0.1, 1);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'thirdEvent' && (name === "data-3400pTop" || name === "data-4200pTop")) {
		element.style.transition = "all 0.5s ease-out 0s";
		element.style.opacity = 0;
	}

	//FORTH EVENT
	if (element.id === 'forthEvent' && name === "data-4800pTop" && direction === "down") {
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(329.63 * 2, 0.1, 1.8);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'forthEvent' && name === "data-5000pTop" && direction === "up"){
		element.style.transition = "all 0.5s ease-in 0s";
		element.style.opacity = 1;
		lead(329.63 * 2, 0.1, 1.8);
		setTimeout(function() {
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		}, 1800);
	} else if (element.id === 'forthEvent' && (name === "data-4400pTop" || name === "data-5200pTop")) {
		element.style.transition = "all 0.5s ease-out 0s";
		element.style.opacity = 0;
	}

	//------------------------------------------------------------------------
	// CIRCLE EVENTS
	if (element.id === 'circle' && name === 'data-2000pTop') {

		element.style.transition = "all 0.4s ease-in 0s";
		element.style.opacity = 1;

		setTimeout(function() {
			element.style.transition = "all 0.9s ease-in 0.5s";
			element.style.opacity = 0;
		}, 600);

	} else if (element.id === 'circle' && name === 'data-3000pTop') {


		setTimeout(function() {
			element.style.transition = "all 1.5s ease 0s";
			element.style.transform = "translate(140px,0px)";
			element.style.webkitTransform = "translate(140px,0px)";
			element.style.opacity = 1;
			setTimeout(function() {
				element.style.transition = "all 1.5s ease 0.0s";
				element.style.transform = "translate(-140px,0px)";
				element.style.webkitTransform = "translate(-140px,0px)";
				setTimeout(function() {
					element.style.transition = "all 1.5s ease 0.0s";
					element.style.transform = "translate(0px,0px)";
					element.style.webkitTransform = "translate(0px,0px)";
					element.style.opacity = 0;
				}, 1500);
			}, 1500);
		});



	} else if (element.id === 'circle' && name === 'data-5200pTop') {

		element.style.transition = "all 0.4s ease-in 0s";
		element.style.opacity = 1;
		setTimeout(function() {
			element.style.opacity = 1;
			element.style.transition = 'all 0.8s ease 0s';
			element.style.transform = "translate(140px,-140px)";
			element.style.webkitTransform = "translate(140px,-140px)";
			setTimeout(function() {
				element.style.transition = 'all 0.8s ease 0s';
				element.style.transform = "translate(-140px,-140px)";
				element.style.webkitTransform = "translate(-140px,-140px)";
				setTimeout(function() {
					element.style.transition = 'all 0.8s ease 0s';
					element.style.transform = "translate(0,0)";
					element.style.webkitTransform = "translate(0px,0px)";
					setTimeout(function() {
						element.style.transition = 'all 0.5s ease 0s';
						element.style.opacity = 0;
					}, 800);
				}, 800);
			}, 800);
		}, 800);
	}

	// TABLE EVENTS
	if (element.id === 'table' && name === 'data-7400pTop') {
		element.style.opacity = 1;
		element.style.transition = "opacity 1.7s ease-in 0s";
	} else if (element.id === 'table' && (name === 'data-7000pTop' || name === 'data-8400pTop')) {
		element.style.opacity = 0;
		element.style.transition = "opacity 0.8s ease-in 0s";
	}
}