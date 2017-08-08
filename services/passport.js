const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SteamStrategy(
    {
      returnURL: keys.returnURL,
      realm: keys.realm,
      apiKey: keys.steamAPI,
      proxy: true
    },
    async function(identifier, profile, done) {
      const existingUser = await User.findOne({
        steamId: profile._json.steamid
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ steamId: profile._json.steamid }).save();
      return done(null, user);
    }
  )
);
