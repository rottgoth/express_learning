var express = require('express');
var app = express();

app.get('/', function(request, response) {
  // response.send('Hello world');
  response.write('Hello World');
  response.end();
});

app.get('/blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];
  // response.send(blocks);
  // response.send('<ul><li>Fixed</li><li>Movable</li></ul>'); // it is better to use ejs and jade
  // response.json(blocks);
  // response.redirect(301, '/parts');
    // 302 Temporarily Moved
    // 301 Moved Permanently
});

app.listen('3000', function() {
  console.log('Listening on port 3000');
});