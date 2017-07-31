const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const keys = require("../config/keys");

passport.use(
  new SteamStrategy(
    {
      returnURL: "https://csgo-match-whatthephil.c9users.io/auth/steam/return",
      realm: "https://csgo-match-whatthephil.c9users.io/",
      apiKey: keys.steamAPI
    },
    function(identifier, profile, done) {
      console.log(profile);
    }
  )
);
