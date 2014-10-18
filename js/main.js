var progress = 0;
var grainInterval = 200; //in ms
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

	var pannerElement = document.getElementById("panIndicator");
	loadSound(context, 'assets/audio/1.wav', function(e) {
		buffer = e;
		setInterval(function() {
			var offset = map(progress, 0.0, 1.0, 0.0, buffer.duration);
			if (offset > buffer.duration) {
				offset = buffer.duration;
			}
			var st = window.getComputedStyle(pannerElement, null);
			console.log();
			var cv = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("transform") ||
			st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform");
			var panPost = parseInt(cv.split(',')[4], 10) / 150;
			console.log(panPost);
			panner.setPosition(panPost,0,0);
			grain(context, buffer, grainGain, 0.3, 0.5, offset);
		}, grainInterval);
	});

	// if(ios || android){
		
	// }else{

		loadSound(context, 'assets/audio/ir.mp3', function(e){
			reverb.buffer = e;
			console.log("reverb ir loaded");
		});
	// }

};