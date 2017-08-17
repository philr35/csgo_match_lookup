const passport = require("passport");
const middleware = require("../middleware");
const CSGO = require("../index.js");

const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/auth/steam", passport.authenticate("steam"), (req, res) => {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

  app.get(
    "/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    async (req, res) => {
      //add some sort of loading spinner beforehand lateron
      res.redirect("/");

      const steamUserInfoURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${req
        .user.steamInfo.id}`;

      const steamPlayTimeURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steamAPI}&steamid=${req
        .user.steamInfo.id}`;

      const steamFriendsList = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${keys.steamAPI}&steamid=${req
        .user.steamInfo.id}&relationship=friend`;

      const steamPlayerBans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${keys.steamAPI}&steamids=${req
        .user.steamInfo.id}`;

      let reqURI = await middleware.requestURIs(
        steamUserInfoURL,
        steamPlayTimeURL,
        steamFriendsList,
        steamPlayerBans
      );

      await middleware.updateMongoUser(req.user, reqURI);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user, null, 2);
  });

  app.get("/api/current_user/matchinfo", middleware.isLoggedIn, (req, res) => {
    CSGO.steamLogon(match => {
      CSGO.setMatch(match);
      res.json(CSGO.matches[0]);
    });
  });

  app.get("/api/current_user/game", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/fetchuser", async (req, res) => {
    //find all similar named users in mongo db query
    const existingUser = await User.find({
      "steamInfo.persona": { $regex: req.body.persona + ".*", $options: "i" }
    }).limit(5);

    return res.send(existingUser);
  });
};
