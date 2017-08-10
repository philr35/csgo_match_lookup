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

middlewareObj.updateMongo = async (existingUser, steamURL) => {
  let info = await request(steamURL);
  info = JSON.parse(info).response.players[0];

  if (existingUser.persona !== info.personaname) {
    User.findOne({ "steamInfo.id": existingUser.id }, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        doc.steamInfo.persona = info.personaname;
        doc.save();
      }
    });
  }

  //add same for avatar, persona state, visibility
};

module.exports = middlewareObj;
