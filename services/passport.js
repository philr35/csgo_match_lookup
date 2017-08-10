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

      const steamUserInfoURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${profile
        ._json.steamid}`;

      const steamPlayTimeURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steamAPI}&steamid=${profile
        ._json.steamid}`;

      const steamFriendsList = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${keys.steamAPI}&steamid=${profile
        ._json.steamid}&relationship=friend`;

      if (existingUser) {
        middleware.updateMongo(
          existingUser.steamInfo,
          steamUserInfoURL,
          steamPlayTimeURL
        );
        return done(null, existingUser);
      }

      let info = await request(steamUserInfoURL);
      info = JSON.parse(info).response.players[0];

      let playtime = await request(steamPlayTimeURL);
      playtime = JSON.parse(playtime).response.games;

      let minutes = playtime.filter(minutes => {
        return minutes.appid === 730 ? minutes : null;
      });

      let steamFriends = await request(steamFriendsList);
      steamFriends = JSON.parse(steamFriends).friendslist.friends;

      let steamFriendsSorted = steamFriends.map(friend => {
        return friend.steamid;
      });

      const user = await new User({
        steamInfo: {
          id: profile._json.steamid,
          persona: info.personaname,
          profileUrl: info.profileurl,
          avatar: info.avatarmedium,
          personaState: info.personastate,
          visibility: info.communityvisibilitystate,
          countryCode: info.loccountrycode || "",
          minutesPlayedForever: minutes[0].playtime_forever,
          minutesPlayed2Weeks: minutes[0].playtime_2weeks,
          friends: steamFriendsSorted
        },
        collectedInfo: { rank: "", reports: "0" }
      }).save();

      return done(null, user);
    }
  )
);
