const mongoose = require("mongoose");
const User = mongoose.model("users");
const request = require("request-promise");
const keys = require("../config/keys");

const middlewareObj = {};

middlewareObj.constructMongoUser = async steamId => {
  const user = await new User({
    steamInfo: {
      id: steamId,
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
    collectedInfo: { rank: "", reports: "0" }
  }).save();

  return user;
};

middlewareObj.constructSteamURLS = steamId => {
  const steamUserInfoURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPI}&steamids=${steamId}`;

  const steamPlayTimeURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steamAPI}&steamid=${steamId}`;

  const steamFriendsList = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${keys.steamAPI}&steamid=${steamId}&relationship=friend`;

  const steamPlayerBans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${keys.steamAPI}&steamids=${steamId}`;

  return {
    steamUserInfoURL: steamUserInfoURL,
    steamPlayTimeURL: steamPlayTimeURL,
    steamFriendsList: steamFriendsList,
    steamPlayerBans: steamPlayerBans
  };
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};

middlewareObj.updateMongoUser = async (user, reqURI) => {
  await middlewareObj.updateMongoUserInfo(user.steamInfo, reqURI.info);
  await middlewareObj.updateMongoUserPlayTime(
    user.steamInfo,
    reqURI.minutes[0]
  );
  await middlewareObj.updateMongoUserOther(
    user.steamInfo,
    reqURI.playerBans,
    reqURI.steamFriendsSorted
  );
};

middlewareObj.updateMongoUserOther = async (
  currentUserInfo,
  newUserBans,
  newUserFriends
) => {
  await User.findOne({ "steamInfo.id": currentUserInfo.id }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (currentUserInfo.playerBans !== newUserBans) {
        doc.steamInfo.playerBans = newUserBans;
      }

      if (currentUserInfo.friends.length !== newUserFriends.length) {
        doc.steamInfo.friends = newUserFriends.slice();
      }

      doc.save();
    }
  });
};

middlewareObj.updateMongoUserPlayTime = async (
  currentUserInfo,
  newUserInfo
) => {
  await User.findOne({ "steamInfo.id": currentUserInfo.id }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (
        currentUserInfo.minutesPlayedForever !== newUserInfo.playtime_forever
      ) {
        doc.steamInfo.minutesPlayedForever = newUserInfo.playtime_forever;
      }

      if (currentUserInfo.minutesPlayed2Weeks !== newUserInfo.playtime_2weeks) {
        doc.steamInfo.minutesPlayed2Weeks = newUserInfo.playtime_2weeks;
      }

      doc.save();
    }
  });
};

middlewareObj.updateMongoUserInfo = async (currentUserInfo, newUserInfo) => {
  await User.findOne({ "steamInfo.id": currentUserInfo.id }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (currentUserInfo.persona !== newUserInfo.personaname) {
        doc.steamInfo.persona = newUserInfo.personaname;
      }
      if (currentUserInfo.profileUrl !== newUserInfo.profileurl) {
        doc.steamInfo.profileUrl = newUserInfo.profileurl;
      }

      if (currentUserInfo.avatar !== newUserInfo.avatarfull) {
        doc.steamInfo.avatar = newUserInfo.avatarfull;
      }

      if (currentUserInfo.personaState !== newUserInfo.personastate) {
        doc.steamInfo.personaState = newUserInfo.personastate;
      }

      if (currentUserInfo.visibility !== newUserInfo.communityvisibilitystate) {
        doc.steamInfo.visibility = newUserInfo.communityvisibilitystate;
      }

      if (
        currentUserInfo.countryCode !== newUserInfo.loccountrycode &&
        newUserInfo.loccountrycode !== undefined
      ) {
        doc.steamInfo.countryCode = newUserInfo.loccountrycode;
      }

      doc.save();
    }
  });
};

middlewareObj.requestURIs = async (
  steamUserInfoURL,
  steamPlayTimeURL,
  steamFriendsList,
  steamPlayerBans
) => {
  let info = await request(steamUserInfoURL);
  info = JSON.parse(info).response.players[0];

  let playtime = await request(steamPlayTimeURL);
  playtime = JSON.parse(playtime).response.games;

  let minutes = playtime.filter(minutes => {
    return minutes.appid === 730 ? minutes : null;
  });

  let steamFriendsSorted = [];
  if (info.communityvisibilitystate === 3) {
    try {
      let steamFriends = await request(steamFriendsList);
      steamFriends = JSON.parse(steamFriends).friendslist.friends;
      steamFriendsSorted = steamFriends.map(friend => {
        return friend.steamid;
      });
    } catch (err) {
      if (err.statusCode === 401) {
        console.log("401 error");
      } else {
        console.log("other type of error?");
      }
    }
  }

  let playerBans = await request(steamPlayerBans);
  playerBans = JSON.parse(playerBans).players[0].NumberOfVACBans;

  return {
    info: info,
    minutes: minutes,
    steamFriendsSorted: steamFriendsSorted,
    playerBans: playerBans
  };
};

module.exports = middlewareObj;
