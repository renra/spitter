var http = require('http');

// Based on the accepted answer of http://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
function parseCookies (request) {
  var list = {},
    rc = request.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

var port = process.env.PORT || 3000;

http.createServer(function(request, response){
  //var cookies = '<pre>' + JSON.stringify(parseCookies(request), null, 2) + '<pre>');
  //var headers = ()

  response.writeHead(200);

  console.log('*****************');
  console.log('Incoming request to ' + request.url);
  console.log('');

  console.log('Cookies');
  console.log(JSON.stringify(parseCookies(request), null, 2));
  console.log('');

  console.log('Headers');
  console.log(JSON.stringify(request.headers, null, 2));
  console.log('');

  console.log('Body');

  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    console.log(body);
    console.log('');
  });

  response.end();
}).listen(port);

console.log('Server running on port: ' + port);
