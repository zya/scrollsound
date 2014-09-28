window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 0.5;
master.connect(context.destination);

function keyframeHandler(element, name, direction) {
	console.log(direction);
	if (element.id === 'test' && name === "dataTop" && direction === "down") {
		console.log('test');
		master.gain.value = 0;
	} else if (element.id === 'test' && name === "dataTop" && direction === "up") {
		master.gain.value = 0.5;
	}
}