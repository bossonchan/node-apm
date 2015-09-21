var ServerInfo = require("./ServerInfo");
var Request    = require("./Request");

var server = null;

function ApplicationServer() {
  this.serverInfos = [];
  this.requests = [];
}

ApplicationServer.prototype.addServerInfo = function(serverInfo) {
  this.serverInfos.push(new ServerInfo(serverInfo));
};

ApplicationServer.prototype.addRequests = function(requests) {
  var that = this;
  requests.forEach(function(request) {
    var obj = new Request(request);
    that.requests.push(obj);
  });
};

ApplicationServer.prototype.getData = function() {
  return JSON.stringify(this);
};

exports.get = function() {
  if (!server) {
    server = new ApplicationServer();
  }
  return server;
};
