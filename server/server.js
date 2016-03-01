var express = require('express');
var bodyParser = require('body-parser');
// var routes = require('./routes');

var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
require('./socket.js')(io);

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.use('/lib', express.static('./node_modules'));
app.use(express.static('./public'));
// app.use('/summoner', routes);


server.listen(PORT, function() {
  console.log('listening on port ', PORT);
});
