const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamId: String
});

mongoose.model("users", userSchema);
