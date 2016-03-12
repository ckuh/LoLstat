module.exports = {
  realm: function(riot, region, callback) {
    riot.staticData.realm(region, function(err, data) {
      if (err) {
        console.error(err);
        callback(JSON.parse(data).status);
      } else {
        callback(data);
      }
    });
  }
}
