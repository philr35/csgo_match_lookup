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

      const steamURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${profile
        ._json.steamid}`;

      if (existingUser) {
        middleware.updateMongo(existingUser.steamInfo, steamURL);
        return done(null, existingUser);
      }

      let info = await request(steamURL);
      info = JSON.parse(info).response.players[0];

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
