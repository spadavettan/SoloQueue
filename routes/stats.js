var unirest = require('unirest');

var secrets = require('../config/secrets');

exports.getData = function (req, res) {
    
    var index = req.query.index;
    var summoner_name = req.query.name;
    var summoner_id;
    var gameData;
    var summoner_data;
    
    if (summoner_name.indexOf(" ") > -1) {
        summoner_name = summoner_name.split(" ").join("%20");
    }
    

    unirest.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summoner_name + '?api_key=' + secrets.apiKey, function (response) {
        if (response.error) {
            //indicate to the caller that there was an internal server error (code 500) and sent the error message
            res.render('stats', { message: response.error });
            return;
        }
        else {
            summoner_data = response.body;
            var lowerName;

            if (summoner_name.indexOf("%20") > -1) {
                lowerName = summoner_name.split("%20").join("").toLowerCase();
                summoner_name = summoner_name.split("%20").join(" ");
            }
            else {
                lowerName = summoner_name.toLowerCase();
            }
            summoner_id = summoner_data[lowerName].id;
            findData(summoner_id);
        }
    });
    
    var findData = function (id) {
        unirest.get('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + summoner_id + '/recent?api_key=26002573-ea67-4481-9b8b-25409d2022b4', function (response) {
            if (response.error) {
                res.send(500, { message: res.error });
                return;
            }

		    else {
                res.render('game_stats', { title: 'Solo Queue', gameData: response.body, index: index, name: summoner_name });
            }
        });
    };
};