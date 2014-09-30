window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 1;
master.connect(context.destination);
var loop = new Loop(loopFunction,0,loopSpeed,context);
var loopSpeed = 0.4;
var loopIsPlaying = false;


function loopFunction(next){
	var osc = context.createOscillator();
	osc.connect(master);
	osc.start(next);
	osc.stop(next + 0.2);
}
// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {

	console.log(name);

	if (element.id === 'section2' && name === "dataTop" && direction === "down") {

		if(!loopIsPlaying){
			loop.start();
			loopIsPlaying = true;
		}
		

	} else if (element.id === 'section2' && name === "dataTop" && direction === "up") {

		loop.stop();
		loopIsPlaying = false;
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