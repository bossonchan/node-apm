var http = require("http");

http.createServer(function(req, res) {
  var time = Math.round(200 * Math.random());
  setTimeout(function() {
    res.write("Hello world");
    res.end();
  }, time);
}).listen(3000);
