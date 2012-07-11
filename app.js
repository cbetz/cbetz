
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');

var app = express();

app.configure(function(){
  app.use(express.favicon());
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
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

http.createServer(app).listen(8080);

console.log("Express server listening on port 8080");
