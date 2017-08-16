const mongoose = require("mongoose");
const User = mongoose.model("users");
const request = require("request-promise");

const middlewareObj = {};

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

      if (
        JSON.stringify(currentUserInfo.friends) !==
        JSON.stringify(newUserFriends)
      ) {
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

  let steamFriends = await request(steamFriendsList);
  steamFriends = JSON.parse(steamFriends).friendslist.friends;

  let steamFriendsSorted = steamFriends.map(friend => {
    return friend.steamid;
  });

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
