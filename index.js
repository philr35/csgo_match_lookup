const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

var { CSbot } = require("./csgo_bot/Bot.js");
var CSGO = new CSbot();
CSGO.startBot();
// CSGO.steamLogon();

module.exports = CSGO;

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(8081, process.env.IP, function() {
  console.log("server has started");
});
