var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , request = require('request');

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

app.get('/api/runs', function (req, res) {
	var x = request('http://api.athlinks.com/athletes/results/36070135?format=json');
    req.pipe(x);
    x.pipe(res);
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

http.createServer(app).listen(8080);

console.log("Express server listening on port 8080");
