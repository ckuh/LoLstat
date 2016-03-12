module.exports = {
  summonerName: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        callback(summonerInfo);
      } else {
        callback(summonerInfo);
      }
    })
  },

  summonerLeague: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        callback(summonerInfo);
      } else {
        riot.league.bySummonerEntry(summonerInfo.id, {}, function(err, data) {
          if (err) {
            callback(JSON.parse(data).status);
          } else {
            callback(data[summonerInfo.id][0]);
          }
        });
      }
    });
  },

  statsSummary: function(riot, userName, callback) {
    console.log('+++line32 userName: ', userName);
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        callback(summonerInfo);
      } else {
        riot.stats.summary(summonerInfo.id, {}, function(err, data) {
          if (err) {
            callback(JSON.parse(data).status);
          } else {
            callback(data);
          }
        });
      }
    });
  },

  statsRanked: function(riot, userName, season, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        callback(summonerInfo);
      } else {
        riot.stats.ranked(summonerInfo.id, {
          season: season
        }, function(err, data) {
          if (err) {
            callback(JSON.parse(data).status);
          } else {
            callback(data);
          }
        })
      }
    })
  }
}

function getSummonerInfo(riot, userName, callback) {
  riot.summoner.byName(userName, {}, function(err, data) {
    if (err) {
      console.error('+++line 74:', err);
      callback(err, JSON.parse(data).status);
    } else {
      callback(err, data[userName]);
    }
  });
}
