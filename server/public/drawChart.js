function loadMetricData(callback) {
  $.getJSON("/getData", function(data) {
    callback(data);
  }, function() {
    alert("load data failed, please retry");
  });
}

function drawRequests(data){
  var ctx = $("#requests canvas")[0].getContext("2d");

  // process data
  var drawData = (function() {
    var map = [];
    var index = -1;
    data
    .sort(function(a, b) {
      return a.startTime - b.startTime;
    })
    .forEach(function(req) {
      var date = new Date(req.startTime);
      var label = date.getHours() + ":" + date.getMinutes();
      var interval = req.endTime - req.startTime;
      if (map.length == 0 || map[index].label != label) {
        map[++index] = { count: 1, sum: interval, average: interval, label: label };
      } else {
        map[index].count++;
        map[index].sum += interval;
        map[index].average = Math.round(map[index].sum / map[index].count);
      }
    });

    return {
      labels: map.map(function(d) { return d.label }),
      data: map.map(function(d) { return d.average })
    };
  })();
  drawChart(ctx, drawData.labels, drawData.data);
}

function drawServerInfo(data) {
  var cpu = $("#cpu canvas")[0].getContext("2d");
  var mem = $("#memory canvas")[0].getContext("2d");
  var data = data.sort(function(a, b) {
    return a.time - b.time;
  });
  var labels = data.map(function(d) {
    return formatTime(d.time);
  })
  var cpuValues = data.map(function(d) {
    return d.cpu;
  });
  var memValues = data.map(function(d) {
    return d.memory;
  });

  drawChart(cpu, labels, cpuValues);
  drawChart(mem, labels, memValues);
}

function formatTime(time) {
  var date = new Date(time);
  return date.getHours() + ":" + date.getMinutes();
}

function drawChart(ctx, labels, data) {
  var data = {
    labels: labels,
    datasets: [{
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: data
    }]
  };
  new Chart(ctx).Line(data);
}

$(function() {
  loadMetricData(function (data) {
    drawRequests(data.requests);
    drawServerInfo(data.serverInfos);
  });
});
