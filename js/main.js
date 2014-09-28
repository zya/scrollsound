window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 0.5;
master.connect(context.destination);

var progress = 0;
var grainInterval = 40; //in ms
var isPlaying = false;

var map = function(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

window.onload = function(){
	s = skrollr.init({
		forceHeight: true,
		render: function(e){
			progress = e.curTop / e.maxTop;
			document.getElementById('progressValue').innerHTML = progress;

		}
	});

	document.addEventListener('touchstart', function(e) {
		if(!isPlaying){
			dummyOsc.start(0);
			isPlaying = true;
		}
	}, true);

	loadSound(context, 'assets/guitar.mp3', function(e) {
		buffer = e;
		setInterval(function() {
			var offset = map(progress, 0.0, 1.0, 0.0, buffer.duration);
			if (offset > buffer.duration) {
				offset = buffer.duration;
			}
			grain(context, buffer, master, 0.3, 0.5, offset);
		}, grainInterval);
	});

};