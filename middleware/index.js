const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const request = require("request");

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};

middlewareObj.updateMongo = steamInfo => {
  // const steamURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${}`
  request("<API Call>", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    }
  });
};

middlewareObj.requestSteamApi = (steamId, _callback) => {
  const steamURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${steamId}`;
  request(steamURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      return _callback(data.response.players[0]);
    }
  });
};

module.exports = middlewareObj;
