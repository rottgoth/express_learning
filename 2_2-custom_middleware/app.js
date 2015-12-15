var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static(__dirname + '/public'));

app.get('/blocks', function(request, response) {
  var blocks = ['First', 'Second', 'Third'];
  response.json(blocks);
})

var server = app.listen(3000, function() {
  console.log('Listening on %s\n', server.address().port);
})