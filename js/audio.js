window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext);
var context = new AudioContext();
var buffer = null;
var dummyOsc = context.createOscillator();
var master = context.createGain();
master.gain.value = 0.2;
master.connect(context.destination);

// KEYFRAME HANDLER
function keyframeHandler(element, name, direction) {
	
	if (element.id === 'test' && name === "dataTop" && direction === "down") {
		// master.gain.value = 0.0;
	} else if (element.id === 'test' && name === "dataTop" && direction === "up") {
		// master.gain.value = 0.0;
	}

	// console.log(element.attributes[2].value);

	if (element.id === 'circle' && (name === 'data-2000pTop' || name==='data-2800pTop')) {

		element.style.transition = "all 0.4s ease-in 0s";
		element.style.opacity = 1;

		setTimeout(function(){
			element.style.transition = "all 0.9s ease-in 0.5s";
			element.style.opacity = 0;
		},600);

	} else if (element.id === 'circle' && name === 'data-5200pTop'){

		element.style.opacity = 1;
		element.style.transition = 'all 0.8s ease 0s';
		element.style.transform = "translate(-140px,-140px)";
		element.style.webkitTransform = "translate(140px,-140px)";
		setTimeout(function(){
			element.style.transition = 'all 0.8s ease 0s';
			element.style.transform = "translate(-140px,-140px)";
			element.style.webkitTransform = "translate(-140px,-140px)";
			setTimeout(function(){
				element.style.transition = 'all 0.8s ease 0s';
				element.style.transform = "translate(0,0)";
				element.style.webkitTransform = "translate(0px,0px)";
				setTimeout(function(){
					element.style.transition = 'all 0.5s ease 0s';
					element.style.opacity = 0;
				},800);
			},800);
		},800);

	}

	console.log(name);
	if(element.id === 'table' && name === 'data-7400pTop'){
		element.style.opacity = 1;
		element.style.transition = "opacity 1.7s ease-in 0s";
	}else if (element.id === 'table' && (name === 'data-7000pTop' || name === 'data-8400pTop') ){
		element.style.opacity = 0;
		element.style.transition = "opacity 0.8s ease-in 0s";
	}
}