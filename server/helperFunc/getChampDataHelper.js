module.exports = {
  champID: function(riot, champID, callback) {
    riot.champion.id(champID, {}, function(err, data) {
      if (err) {
        console.error(err);
        callback(JSON.parse(data).status);
      } else {
        callback(data);
      }
    });
  }
}
