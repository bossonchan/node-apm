var http = require("http");
var Trace = require("./Trace");
var requestId = 0;

var oldCreateServer = http.createServer;
http.createServer = function(handler) {
  var newHandler = function(req, res) {
    var id = "requestId" + (++requestId);
    Trace.add(id, req);
    res.on("finish", function() {
      Trace.add(id, res);
      Trace.submit(id);
    });
    return handler.apply(null, arguments);
  };
  return oldCreateServer.call(http, newHandler);
};
