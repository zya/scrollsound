window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 1;
master.connect(context.destination);
// var loop = new Loop(loopFunction,0,1,context);
var loopIsPlaying = false;
// loop.start();

function loopFunction(next){
	console.log('t');
	if(loopIsPlaying){
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
// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {

	if (element.id === 'section2' && name === "dataTop" && direction === "down") {

		loopIsPlaying = true;

	} else if (element.id === 'section2' && name === "dataTop" && direction === "up") {

		loopIsPlaying = false;
	}

	if(element.id === 'firstEvent' && name === "data-1700pTop"){
		element.style.transition = "all 0.9s ease-in 0s";
		element.style.opacity = 1;
		setTimeout(function(){
			element.style.transition = "all 1.2s ease-out 0.5s";
			element.style.opacity = 0;
		},1800);
	}else if(element.id === 'firstEvent' && name === "data-1200pTop"){
		element.style.transition = "all 0.5s ease-out 0s";
		element.style.opacity = 0;
	}

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
			    setTimeout(function(){
			    	element.style.transition = "all 1.5s ease 0.0s";
			    	element.style.transform = "translate(0px,0px)";
			    	element.style.webkitTransform = "translate(0px,0px)";
					element.style.opacity = 0;
			    },1500);
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