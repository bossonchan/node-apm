var Request = require("../models/Request");
var submitter = require("./submmiter");
var store = {};

function Trace(url) {
  this.url = url;
  this.time = Date.now();
}

exports.add = function(id, req) {
  if (!store[id]) store[id] = [];
  store[id].push(new Trace(req.url));
};

exports.submit = function(id) {
  var traces = store[id];
  if (!traces || traces < 2) {
    delete store[id];
    return;
  }

  var before = traces[0];
  var after  = traces[traces.length - 1];
  var request = new Request({
    url: before.url,
    startTime: before.time,
    endTime: after.time
  });

  submitter.submit(request);
  delete store[id];
};
