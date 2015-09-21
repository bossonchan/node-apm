var http = require("http");
var urlParse = require("url").parse;
var ServerInfo = require("../models/ServerInfo");
var requests = [];

var interval = setInterval(function() {
  if (requests.length == 0) return;

  var _requests = [];
  for(var i = 0, len = requests.length; i < len; i++) {
    _requests.push(requests.shift());
  }

  var data = "";
  var data = _requests.map(function(request) {
    return JSON.stringify(request);
  }).join(";;");

  data += (";;" + JSON.stringify(ServerInfo.collect()));

  var serverHost = "localhost";
  var serverPort = "8080";
  var url = "http://" + serverHost + ":" + serverPort + "/saveData?d=" + encodeURIComponent(data);

  var options = urlParse(url);
  http.request(options).end();
}, 1000);

exports.submit = function(request) {
  requests.push(request);
};

