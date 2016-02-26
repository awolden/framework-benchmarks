
var restify = require('restify'), // require the restify library.
  server = restify.createServer(); // create an HTTP server.

server.get('/hello', function (req, res) {
  res.send('Hello, World!');
});

server.listen(process.env.PORT || 3000, function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
