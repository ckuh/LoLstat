var getUserDataHelper = require('./helperFunc/getUserDataHelper');
var getChampDataHelper = require('./helperFunc/getChampDataHelper');
var getStaticDataHelper = require('./helperFunc/getStaticDataHelper');
var riot = require('./config.js').riot;

module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('disconnect', function() {
      io.emit('user left')
    });

    socket.on('staticRealm', function(region) {
      riot.settings = {
        region: region,
        global: 'global'
      }
      getStaticDataHelper.realm(riot, region, function(data) {
        io.emit('staticRealm', data)
      })
    })
    socket.on('summonerName', function(userName) {
      getUserDataHelper.summonerName(riot, setUserName(userName), function(data) {
        io.emit('summonerName', data);
      })
    })

    socket.on('summonerLeague', function(userName) {
      getUserDataHelper.summonerLeague(riot, setUserName(userName), function(data) {
        io.emit('summonerLeague', data);
      })
    })

    socket.on('statsSummary', function(userName) {
      getUserDataHelper.statsSummary(riot, setUserName(userName), function(data) {
        io.emit('statsSummary', data);
      })
    })

    socket.on('statsRanked', function(userInfo) {
      getUserDataHelper.statsRanked(riot, setUserName(userInfo.name), userInfo.season, function(data) {
        for (var i = 0; i < data.length; i++) {

        }
        io.emit('statsRanked', data);
      })
    })

    socket.on('champName', function() {
      getChampDataHelper.champName(riot, function(data) {
        io.emit('champName', data);
      })
    })
  })
}

function setUserName(userName) {
  userName = userName.split(' ').join('');
  return userName.toLowerCase();
}
