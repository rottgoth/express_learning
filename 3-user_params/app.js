var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/blocks', function(request, response) {
  // use of query params
  var blocks = ['First', 'Second', 'Third'];
  if (request.query.limit >= 0) {
    response.json(blocks.slice(0, request.query.limit));
  } else {
    response.json(blocks);
  }
})

var blocks = {
  'First': 'First element of the list',
  'Second': 'The new element of the list',
  'Third': 'Last element of the list'
};

app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.params.name];
  if (!description) {
    response.status(404).json('No description found for ' + request.params.name);
  } else {
    response.json(description); // returns 200 status code
  }
})

var server = app.listen(3000, function() {
  console.log('Listening on %s\n', server.address().port);
})