var unirest = require('unirest');

exports.getData = function (req, res) {
    
    var summoner_name = req.params.summonerid;
    var index = req.params.index;
    var summoner_id;
    var gameData;
    var summoner_data;
    
    
    unirest.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summoner_name + '?api_key=26002573-ea67-4481-9b8b-25409d2022b4', function (response) {
        if (response.error) {
            //indicate to the caller that there was an internal server error (code 500) and sent the error message
            res.send(500, { message: response.error });
            return;
        }
        else {
            summoner_data = response.body;
            var lowerName = summoner_name.toLowerCase();
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
                res.render('game_stats', { title: 'Solo Queue', gameData: response.body.index });
            }
        });
    };
};