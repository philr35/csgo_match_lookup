const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/authRoutes")(app);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server has started");
});
