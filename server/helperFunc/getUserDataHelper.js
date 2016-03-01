var riot = require('../../node_modules/riot-games-api-nodejs/lib/riot-games-api-nodejs.js')

var pathParam = {
    championId : "21",
    freeToPlay : "true",
    summonerId : '30023541',
    summonerName : 'kuhkoo',
    type : 'RANKED_SOLO_5X5'
}

riot.developerKey = config.api_key;

riot.settings = {
  region: 'na'
}

//{"kuhkoo":{"id":30023541,"name":"kuhkoo","profileIconId":962,"summonerLevel":30,"revisionDate":1451893879000}}
