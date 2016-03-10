module.exports = {
  summonerName: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error(err);
        callback(summonerInfo);
      } else {
        callback(summonerInfo);
      }
    })
  },

  summonerLeague: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error(err);
        callback(summonerInfo);
      } else {
        riot.league.bySummonerEntry(summonerInfo.id, {}, function(err, data) {
          if (err) {
            console.error(err);
            callback(JSON.parse(data).status);
          } else {
            callback(data);
          }
        });
      }
    });
  },

  statsSummary: function(riot, userName, callback) {
    console.log('+++line3 userName: ', userName);
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error(err);
        callback(summonerInfo);
      } else {
        riot.stats.summary(summonerInfo.id, {}, function(err, data) {
          if (err) {
            console.error(err);
            callback(JSON.parse(data).status);
          } else {
            callback(data);
          }
        });
      }
    });
  },

  statsRanked: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error(err);
        callback(summonerInfo);
      } else {
        riot.stats.ranked(summonerInfo.id, {
          season: 'SEASON4'
        }, function(err, data) {
          if (err) {
            console.error(err);
            callback(JSON.parse(data).status);
          } else {
            console.log(data);
            callback(data);
          }
        })
      }
    })
  }
}

function getSummonerInfo(riot, userName, callback) {
  console.log(userName);
  riot.summoner.byName(userName, {}, function(err, data) {
    if (err) {
      console.error(err);
      callback(err, JSON.parse(data).status);
    } else {
      callback(err, data[userName]);
    }
  });
}
