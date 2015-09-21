var http = require("http");
var urlParse = require("url").parse;
var qs   = require("querystring");
var server = require("../models/ApplicationServer").get();
var fs = require("fs");
var path = require("path");

http.createServer(function(req, res) {
  var options = urlParse(req.url);
  var query = qs.parse(options.query);

  if (options.pathname == "/saveData") {
    if (!query || !query.d) return res.end();

    var data = query.d.split(";;");
    var serverInfo = data.pop();

    try {
      serverInfo = JSON.parse(serverInfo);
      server.addServerInfo(serverInfo);
    } catch(e) {}

    try {
      var requests = data.map(function(d) { return JSON.parse(d) });
      server.addRequests(requests);
    } catch(e) {}

    res.end();
  } else if (options.pathname == "/getData"){
    res.writeHead("Content-Type", "application/json");
    res.write(server.getData());
    res.end();
  } else {
    var pathname = options.pathname == "/" ? "/index.html" : options.pathname;
    var staticFile = path.resolve(__dirname + "/public" + pathname);
    var getMimeType = function(file) {
      var ext = path.extname(file);
      if (ext == ".html" || ext == ".htm") return "text/html";
      if (ext == ".js") return "application/javascript";
      if (ext == ".css") return "text/css";
      return "text/plain";
    };
    fs.exists(staticFile, function(exists) {
      if (!exists) return res.end("not found");
      fs.readFile(staticFile, "utf-8", function(error, file) {
        if (error) return res.end("error");
        res.writeHead("Content-Type", getMimeType(staticFile));
        res.write(file);
        res.end();
      });
    });
  }
}).listen(8080);
