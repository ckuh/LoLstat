module.exports = {
  summonerName: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error('+++line5 :', err);
        callback(summonerInfo);
      } else {
        callback(summonerInfo);
      }
    })
  },

  summonerLeague: function(riot, userName, callback) {
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error('+++line16 :', err);
        callback(summonerInfo);
      } else {
        riot.league.bySummonerEntry(summonerInfo.id, {}, function(err, data) {
          if (err) {
            console.error('+++line21 :', err);
            callback(JSON.parse(data).status);
          } else {
            callback(data[summonerInfo.id][0]);
          }
        });
      }
    });
  },

  statsSummary: function(riot, userName, callback) {
    console.log('+++line3 userName: ', userName);
    getSummonerInfo(riot, userName, function(err, summonerInfo) {
      if (err) {
        console.error('+++line 35:', err);
        callback(summonerInfo);
      } else {
        riot.stats.summary(summonerInfo.id, {}, function(err, data) {
          if (err) {
            console.error('+++line 40:', err);
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
        console.error('+++line 53:', err);
        callback(summonerInfo);
      } else {
        riot.stats.ranked(summonerInfo.id, {
          season: season
        }, function(err, data) {
          if (err) {
            console.error('+++line 60:', err);
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
  console.log(userName);
  riot.summoner.byName(userName, {}, function(err, data) {
    if (err) {
      console.error('+++line 75:', err);
      callback(err, JSON.parse(data).status);
    } else {
      callback(err, data[userName]);
    }
  });
}
