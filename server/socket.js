var getUserDataHelper = require('./helperFunc/getUserDataHelper');
var getChampDataHelper = require('./helperFunc/getChampDataHelper');
var getStaticDataHelper = require('./helperFunc/getStaticDataHelper');
var riot = require('./config.js').riot;
var secret = require('./config.js').secret;
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log(socket.id);
    // genSocketId(function(id){
    //   socket.join(id);
    //   io.emit('roomJoin', id);
    // })

    socket.on('disconnect', function() {
      io.emit('user left')
    });

    socket.on('staticRealm', function(region) {
      riot.settings = {
        region: region,
        global: 'global'
      }
      getStaticDataHelper.realm(riot, region, function(data) {
        io.to(socket.id).emit('staticRealm', data)
      })
    })
    socket.on('summonerName', function(userName) {
      getUserDataHelper.summonerName(riot, setUserName(userName), function(data) {
        io.to(socket.id).emit('summonerName', data);
      })
    })

    socket.on('summonerLeague', function(userName) {
      getUserDataHelper.summonerLeague(riot, setUserName(userName), function(data) {
        io.to(socket.id).emit('summonerLeague', data);
      })
    })

    socket.on('statsSummary', function(userName) {
      getUserDataHelper.statsSummary(riot, setUserName(userName), function(data) {
        io.to(socket.id).emit('statsSummary', data);
      })
    })

    socket.on('statsRanked', function(userInfo) {
      getUserDataHelper.statsRanked(riot, setUserName(userInfo.name), userInfo.season, function(data) {
        for (var i = 0; i < data.length; i++) {

        }
        io.to(socket.id).emit('statsRanked', data);
      })
    })

    socket.on('champName', function() {
      getChampDataHelper.champName(riot, function(data) {
        io.to(socket.id).emit('champName', data);
      })
    })
  })
}

function genSocketId(callback) {
  bcrypt.genSalt(10, function(err, salt) {
    var token = jwt.encode(salt, secret);
    callback(JSON.stringify(token));
  })
}

function setUserName(userName) {
  userName = userName.split(' ').join('');
  return userName.toLowerCase();
}
