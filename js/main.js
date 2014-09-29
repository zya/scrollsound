var progress = 0;
var grainInterval = 40; //in ms
var isPlaying = false;

var map = function(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

window.onload = function() {
	
	s = skrollr.init({
		// smoothScrolling: true,
		// mobileDeceleration:0.003,
		forceHeight: true,
		render: function(e) {
			progress = e.curTop / e.maxTop;
			document.getElementById('progressValue').innerHTML = progress;

		},
		keyframe: keyframeHandler
	});

	document.addEventListener('touchstart', function(e) {
		if (!isPlaying) {
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