var Track;

function preload() {
	Track = loadSound('media/Billy T Ben X Mustard.mp3');
}

function setup() {
	Track.setVolume(0.5);
	Track.loop();
}

$(document).ready( function() {
	$( "#begin" ).click(function() {
		console.log("Clicked begin!");
		document.location.href = "/game";
	});
});

