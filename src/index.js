var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});