function ServerInfo(info) {
  this.cpu = info.cpu;
  this.memory = info.memory;
  this.time = Date.now();
}

ServerInfo.collect = function() {
  var getCPUUsage = function() {
    var cpus = require("os").cpus();
    var cpusTotal = 0;
    for(var i = 0, len = cpus.length; i < len; i++) {
      var cpu = cpus[i], total = 0;
      for(type in cpu.times) total += cpu.times[type];
      cpusTotal += (100 - Math.round(100 * (cpu.times.idle / total)))
    }
    return Math.round(cpusTotal / cpus.length);
  };

  var getMemoryUsage = function() {
    var usages = process.memoryUsage();
    return Math.round(100 * (usages.heapUsed / usages.heapTotal));
  };

  return {
    cpu: getCPUUsage(),
    memory: getMemoryUsage(),
    time: Date.now()
  };
};

module.exports = ServerInfo;
