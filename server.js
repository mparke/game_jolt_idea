var express = require('express');
var fs = require('fs');

var app = express();
var server;

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static('./public'));

app.get('/', function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fs.readFileSync('./index.html'));
});

server = app.listen(3000);
