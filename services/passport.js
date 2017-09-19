const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const middleware = require("../middleware");
const User = mongoose.model("users");

const request = require("request-promise");

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
        "steamInfo.id": profile._json.steamid
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        steamInfo: {
          id: profile._json.steamid,
          persona: "",
          profileUrl: "",
          avatar: "",
          personaState: "",
          visibility: "",
          countryCode: "",
          minutesPlayedForever: 0,
          minutesPlayed2Weeks: 0,
          playerBans: 0,
          friends: []
        },
        collectedInfo: { rank: "", rankDate: "", reputation: 0 }
      }).save();

      return done(null, user);
    }
  )
);
