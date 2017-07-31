const express = require("express");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(app);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server has started");
});
