var progress = 0;
var grainInterval = 200; //in ms
var isPlaying = false;
var irIsLoaded = false;
var audioIsLoaded = false;

// scale helpfer function
var map = function(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

window.onload = function() {

	s = skrollr.init({
		smoothScrolling: true,
		mobileDeceleration: 0.0009,
		// forceHeight: false,
		render: function(e) {
			progress = e.curTop / e.maxTop;
		},
		keyframe: keyframeHandler
	});

	console.log(s);

	//dummy oscstart on touch start for mobile audio init
	document.addEventListener('touchstart', function(e) {
		if (!isPlaying) {
			dummyOsc.start(0);
			isPlaying = true;
		}
	}, true);

	var pannerElement = document.getElementById("panIndicator");

	var loadeingElement = document.getElementById("loading");

	loadSound(context, 'assets/audio/1.mp3', function(e) {
		buffer = e;
		setInterval(function() {
			var offset = map(progress, 0.0, 1.0, 0.0, buffer.duration);
			if (offset > buffer.duration) {
				offset = buffer.duration;
			}
			//getting the transform x value of element for use with panning
			var st = window.getComputedStyle(pannerElement, null);
			var cv = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("transform") ||
				st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform");
			var panPost = parseInt(cv.split(',')[4], 10) / 150;
			panner.setPosition(panPost, 0, 0);
			//grain
			grain(context, buffer, grainGain, 0.3, 0.5, offset);


		}, grainInterval);
		//start the app when everything is loaded
		audioIsLoaded = true;
		if (irIsLoaded) {
			console.log("loading is done");
			document.body.style.overflowY = "visible";
			fadeOut(loadeingElement,1.2);
			setTimeout(function(){
				fadeIn(document.getElementById("scrollIcon"), 2);
			},1500);
			//initialise skrollr
			s = skrollr.init({
				smoothScrolling: true,
				mobileDeceleration: 0.0009,
				// forceHeight: false,
				render: function(e) {
					progress = e.curTop / e.maxTop;
				},
				keyframe: keyframeHandler
			});
		} else {
			setTimeout(function() {
				document.body.style.overflowY = "visible";
				fadeOut(loadeingElement,1.2);
				setTimeout(fadeIn(document.getElementById("scrollIcon"), 1.5),1500);
				//initialise skrollr
				s = skrollr.init({
					smoothScrolling: true,
					mobileDeceleration: 0.0009,
					// forceHeight: false,
					render: function(e) {
						progress = e.curTop / e.maxTop;
					},
					keyframe: keyframeHandler
				});
			}, 2000);
		}
	});

	loadSound(context, 'assets/audio/ir.mp3', function(e) {
		reverb.buffer = e;
		irIsLoaded = true;
	});

};