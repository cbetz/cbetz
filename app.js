var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , request = require('request')
  , settings = require('./settings.json');

var app = express();

app.configure(function(){
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes

app.get('/', function (req, res) {
	fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, data) {
		res.contentType('text/html');
		res.send(data);
	});
});

app.get('/api/repos', function (req, res) {
	var x = request('https://api.github.com/users/cbetz/repos');
    req.pipe(x);
    x.pipe(res);
});

app.get('/api/races', function (req, res) {
	var x = request('http://api.athlinks.com/athletes/results/36070135?format=json');
    req.pipe(x);
    x.pipe(res);
});

app.get('/api/runs', function (req, res) {
	getRuns(function (error, response, body) {
		if (response.statusCode == 200) {	
			res.charset = 'utf-8';
			res.contentType('application/json');
			res.send(body);
		} else {
			res.contentType('text/html');
			res.send(body);
		}
	});
});

app.get('/api/:resource', function (req, res) {
    fs.readFile(__dirname + '/api/' + req.params.resource + '.json', 'utf8', function (err, data) {
        if (err) {
			res.send(err);
		} else {
			res.contentType('json');
			res.send(JSON.parse(data));
		}
    });
});

function garminLogin(callback) {
	request('https://connect.garmin.com/signin', function (error, response, body) {
		if (!error) {
			request(
				{ 	
					method: 'POST',
					uri: 'https://connect.garmin.com/signin',
					form: {
						'login': 'login', 
						'javax.faces.ViewState': 'j_id2',
						'login:loginUsernameField': settings.garminUsername,
						'login:password': settings.garminPassword
					}
				}
				, function (error, response, body) { 
					callback(error, response, body);
			});
		}
	});
}
function getRuns(callback) {
	request('https://connect.garmin.com/proxy/activity-search-service-1.2/json/activities?&start=0&limit=50', function (error, response, body) {					
		if (response.statusCode == 403) {
			garminLogin(function(error, response, body) {
				getRuns(function(error, response, body) {
					callback(error, response, body);
				});
			});
		} else {	
			callback(error, response, body);
		}
	});
}

http.createServer(app).listen(8080);

console.log("Express server listening on port 8080");
