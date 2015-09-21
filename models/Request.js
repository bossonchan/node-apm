function Request(data) {
  this.url = data.url || "";
  this.startTime = data.startTime || 0;
  this.endTime = data.endTime || 0;
}

module.exports = Request;
