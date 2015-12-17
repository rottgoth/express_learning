var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// npm install body-parser
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

var blocks = {
  'First': 'First element of the list',
  'Second': 'The new element of the list',
  'Third': 'Last element of the list'
};

app.route('/blocks')
  .get(function(request, response) {
    // use of query params
    var blockKeys = Object.keys(blocks);
    if (request.query.limit >= 0) {
      response.json(blockKeys.slice(0, request.query.limit));
    } else {
      response.json(blockKeys);
    }
  })

  .post(parseUrlEncoded, function(request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    response.status(201).json(newBlock.name);
  });

app.route('/blocks/:name')
  .get('/blocks/:name', function(request, response) {
    var description = blocks[request.blockName];
    if (!description) {
      response.status(404).json('No description found for ' + request.params.name);
    } else {
      response.json(description); // returns 200 status code
    }
  })
  .delete('/blocks/:name', function(request, response) {
    delete blocks[request.blockName]
    response.sendStatus(200);
  });

app.param('name', function (request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  request.blockName = block;
  next();
});


var server = app.listen(3000, function() {
  console.log('Listening on %s\n', server.address().port);
})