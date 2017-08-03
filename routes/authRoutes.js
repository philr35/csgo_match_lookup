const passport = require("passport");

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
};
