window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 0.0;
master.connect(context.destination);

// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {
	console.log(name);
	if (element.id === 'test' && name === "dataTop" && direction === "down") {
		console.log('test');
		master.gain.value = 0.0;
	} else if (element.id === 'test' && name === "dataTop" && direction === "up") {
		master.gain.value = 0.0;
	}

	console.log(element.attributes[2].value);
	//circle
	if (element.id === 'circle' && name === 'data-420pTop') {
		var osc = context.createOscillator();
		osc.start(0);
		osc.stop(context.currentTime + 0.5);
		osc.connect(master);

		element.style.transition = "all 0.1s ease-in 0s";
		element.style.opacity = 1;

		setTimeout(function(){
			element.style.transition = "all 0.5s linear 0.5s";
			element.style.opacity = 0;
		},600);
	}
}