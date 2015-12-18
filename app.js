//Set up requirements
var express = require("express");
var Request = require('request');
var bodyParser = require('body-parser');

//Create an 'express' object
var app = express();

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

// Enable json body parsing of application/json
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

/*---------------
//DATABASE CONFIG
----------------*/
var cloudant_USER = 'andacal';
var cloudant_DB = 'finalformashups';
var cloudant_KEY = 'buthertsteryourresseserv';
var cloudant_PASSWORD = '281e814a28932390c4d51600a0814a0ae651a442';

var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;

//******* ROUTES *******
// GET 
app.get("/", function (request, response) {
	console.log("In main route");
	response.render('index');
});

//POST
app.post("/save", function (request, response) {
	console.log("Making a post!");
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: request.body
	},
	function (err, res, body) {
		if (res.statusCode == 201){
			console.log('Doc was saved!');
			response.json(body);
		}
		else{
			console.log('Error: '+ res.statusCode);
			console.log(body);
		}
	});
});

// GET - API route to get the CouchDB data after page load.
app.get("/api/all", function (request, response) {
	// Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	}, function (err, res, body){
		//Grab the rows
		var theData = body.rows;

		if (theData){
			response.json(theData);
		}
		else{
			response.json({noData:true});
		}
	});
});

// GET - Route to load the view and client side javascript to display the scores.
app.get("/gameOver", function (request, response) {
	console.log(request.query);
	console.log(request.query.gamescore);
	
	var theScore;
	if (request.query.gamescore){
		theScore = request.query.gamescore;
	} else{
		console.log("no score...");
		theScore = 0;
	}
	response.render('gameEnd', {score: theScore});
});

app.get("/game", function (request, response) {
	response.render('game');
});


app.listen(port);
console.log('Express started on port' + port);