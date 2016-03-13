var riot = require('../lib/riot-games-api-nodejs/lib/riot-games-api-nodejs.js');
var api_key = "c70c3b46-14a4-4cae-b9dc-e165216d3274";

riot.developerKey = api_key;

module.exports = {
  riot: riot,
  secret: 'anivia'
};
