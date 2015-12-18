var Track;

function preload() {
	Track = loadSound('media/Billy T Ben X Mustard.mp3');
}

function setup() {
	Track.setVolume(0.5);
	Track.loop();
}

var scoreTemplate = function (data) {
	template = '<div class="score">';
	template += '<div>' + data.title + '</div>';
	template += '<div>'+ data.score +'</div>';
	template += '<p>'+ '' +'</p>';
	template += '</div>';

	return template;
};

function saveRecord (theData) {
	console.log("Trying to Post");
	$.ajax({
		url: "/save",
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(theData),
		error: function (resp) {
			console.log(resp);
			$("#highscore").prepend("<p><strong>Something broke.</strong></p>");
		},
		success: function (resp) {
			console.log("this is the resp" + resp);
			var htmlString = scoreTemplate(theData);
			$("#list").append(htmlString);

			// Empty the form.
			$("#person-name").val("");
			// Deselect the submit button.
			$("#name-submit").blur();

			setTimeout(function(){ document.location.href = "/"; }, 5000);
		}
	});
}

function loadScores() {
	$.ajax({
		url: "/api/all",
		type: "GET",
		data: JSON,
		error: function(resp){
			console.log(resp);
		},
		success: function (resp) {
			console.log(resp);
			//$("#scores").empty();

			if (resp.noData){
				return;
			}

			// Use Underscore's sort method to sort our records by score.
			var sorted = _.sortBy(resp, function (row) { return row.doc.score;});

			// Now that the notes are sorted, add them to the page
			sorted.forEach(function (row) {
				var htmlString = scoreTemplate(row.doc);
				$('#list').prepend(htmlString);
			});
		}
	});
}

$(document).ready(function(){
	console.log("Loaded!");
	loadScores();

	$("#highscore").submit(function () {
		// Get the information we want from the form including creating a new date.
		var scoreData = {
			title: $("#person-name").val(),
			score: $("#scores").html(),
		};

		//Send the data to our saveRecord function
		saveRecord(scoreData);

		//Return false to prevent the form from submitting itself
		return false;
	});
});
