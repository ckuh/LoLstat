var getUserDataHelper = require('./helperFunc/getUserDataHelper');
var getChampDataHelper = require('./helperFunc/getChampDataHelper');
var riot = require('./config.js').riot;

module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('disconnect', function() {
      io.emit('user left')
    });

    socket.on('summonerName', function(userName) {
      getUserDataHelper.summonerName(riot, setUserName(userName), function(data) {
        io.emit('summonerName', data);
      })
    })

    socket.on('statsSummary', function(userName) {
      getUserDataHelper.statsSummary(riot, setUserName(userName), function(data) {
        io.emit('statsSummary', data);
      })
    })

    socket.on('statsRanked', function(userName) {
      getUserDataHelper.statsRanked(riot, setUserName(userName), function(data) {
        for (var i = 0; i < data.length; i++) {

        }
        io.emit('statsRanked', data);
      })
    })
  })
}

function setUserName(userName) {
  return userName.split(' ').join('');
}
