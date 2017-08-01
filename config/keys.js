// keys.js - figre out set of credentials to return
if (process.env.NODE_ENV === "production") {
  //we are in production return teh production set of keys
  module.exports = require("./prod");
} else {
  //we are in development
  module.exports = require("./dev");
}