var express = require('express');
var app = express();

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
// the same using static middleware:
app.use(express.static(__dirname + '/public'));

app.get('/blocks', function(request, response) {
  var blocks = ['First', 'Second', 'Third'];
  response.json(blocks);
})

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
})