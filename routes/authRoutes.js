const passport = require("passport");
const middleware = require("../middleware");
const CSGO = require("../index.js");

module.exports = app => {
  app.get(
    "/auth/steam",
    passport.authenticate("steam", {
      scope: ["steamid", "displayname", "profileurl", "avatarfull"]
    }),
    (req, res) => {
      // The request will be redirected to Steam for authentication, so
      // this function will not be called.
    }
  );

  app.get(
    "/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/current_user/profile", middleware.isLoggedIn, (req, res) => {
    CSGO.setSteamId(req.user.steamId);
    CSGO.steamLogon((accountId, match) => {
      CSGO.setAccountId(accountId);
      CSGO.setMatch(match);
      res.send(
        JSON.stringify(
          { accountId: CSGO.accountId, matches: CSGO.matches },
          null,
          2
        )
      );
    });
  });

  app.get("/api/current_user/game", (req, res) => {
    res.send(req.user);
  });
};
