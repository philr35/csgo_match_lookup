const passport = require("passport");
const middleware = require("../middleware");
let CSGO = require("../index.js");

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
      //USE STEAM ID AND CHECK IF RANK IN DB
      //IF NOT THEN MODAL POPUP
      //MAKE NEW POST ROUTE
      //CHECK ROUTE IN APP.JS COMPONENT DID MOUNT
      //RENDER MODAL IF USER RANK IS EMPTY
      //DISABLE SEARCH BAR AND OTHER FEATURES

      const steamURL = middleware.constructSteamURLS(req.user.steamInfo.id);

      let reqURI = await middleware.requestURIs(
        steamURL.steamUserInfoURL,
        steamURL.steamPlayTimeURL,
        steamURL.steamFriendsList,
        steamURL.steamPlayerBans
      );

      await middleware.updateMongoUser(req.user, reqURI);

      res.redirect("/");
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

  app.post("/api/fetchbypersona", async (req, res) => {
    //find all similar named users in mongo db query
    const existingUser = await User.find({
      "steamInfo.persona": {
        $regex: "^" + req.body.persona,
        $options: "i"
      }
    }).limit(5);

    res.send(existingUser);
  });

  app.post("/api/fetchbyuserid", async (req, res) => {
    let existingUser = await User.find({
      "steamInfo.id": req.body.id
    });

    if (existingUser.length === 0) {
      //HTTP REQUEST TO WEB API
      //ADD TO DATABASE AND THEN SEARCH FOR ID AGAIN
      const steamURL = middleware.constructSteamURLS(req.body.id);

      const reqURI = await middleware.requestURIs(
        steamURL.steamUserInfoURL,
        steamURL.steamPlayTimeURL,
        steamURL.steamFriendsList,
        steamURL.steamPlayerBans
      );

      const user = await middleware.constructMongoUser(req.body.id);

      await middleware.updateMongoUser(user, reqURI);

      existingUser = await User.find({
        "steamInfo.id": req.body.id
      });
    }

    res.send(existingUser);
  });
};
