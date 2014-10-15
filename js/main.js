var progress = 0;
var grainInterval = 150; //in ms
var isPlaying = false;

var map = function(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

window.onload = function() {
	
	s = skrollr.init({
		smoothScrolling: true,
		mobileDeceleration:0.0009,
		// forceHeight: true,
		render: function(e) {
			progress = e.curTop / e.maxTop;
		},
		keyframe: keyframeHandler
	});

	document.addEventListener('touchstart', function(e) {
		if (!isPlaying) {
			dummyOsc.start(0);
			isPlaying = true;
		}
	}, true);

	loadSound(context, 'assets/audio/1.mp3', function(e) {
		buffer = e;
		setInterval(function() {
			var offset = map(progress, 0.0, 1.0, 0.0, buffer.duration);
			if (offset > buffer.duration) {
				offset = buffer.duration;
			}
			// master.gain.value = document.getElementById('section1').style.opacity;
			grain(context, buffer, grainGain, 0.3, 0.5, offset);
		}, grainInterval);
	});

	if(ios || android){
		
	}else{
		
		loadSound(context, 'assets/audio/ir.mp3', function(e){
			reverb.buffer = e;
			console.log("reverb ir loaded");
		});
	}

};