const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.use(
  new SteamStrategy(
    {
      returnURL: keys.returnURL,
      realm: keys.realm,
      apiKey: keys.steamAPI
    },
    function(identifier, profile, done) {
      User.findOne({ steamId: profile._json.steamid }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ steamId: profile._json.steamid })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
