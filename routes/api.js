var unirest = require('unirest');

exports.getData = function(req, res) {

	var summoner = req.query.name;
	var summonder_id;
	var gameData;


	unirest.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summoner + '?api_key=26002573-ea67-4481-9b8b-25409d2022b4', function(res) {
		if (res.error) {
            
            //indicate to the caller that there was an internal server error (code 500) and sent the error message
            res.send(500, { message: res.error });
            return;
        }
        
        else {
            var summoner_data = JSON.parse(res.body);
            var lowerName = summonder_id.toLowerCase();
            summonder_id = summoner_data[lowerName].id;
        }
	});

	unirest.get(' https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + summonder_id + '/recent?api_key=26002573-ea67-4481-9b8b-25409d2022b4', function(res) {
		if (res.error) {
			res.send(500, {message: res.error});
			return;
		}

		else {
			gameData = JSON.parse(res.body);
		}
	});

	res.end(gameData);
};