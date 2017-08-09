const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const middleware = require("../middleware");
const User = mongoose.model("users");

const request = require("request");

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
        steamInfo: { id: profile._json.steamid }
      });

      if (existingUser) {
        middleware.updateMongo(existingUser);
        return done(null, existingUser);
      }

      const steamURL = "hiding url for post";

      const info = await request(steamURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          return JSON.parse(body);
        }
      });

      console.log(info);

      const user = await new User({
        steamInfo: {
          id: profile._json.steamid,
          persona: info.personaname,
          profileUrl: info.profileurl,
          avatar: info.avatarmedium,
          personaState: info.personastate,
          visibility: info.communityvisibilitystate,
          countryCode: info.loccountrycode
        },
        collectedInfo: { rank: "", reports: "0" }
      }).save();

      return done(null, user);
    }
  )
);
