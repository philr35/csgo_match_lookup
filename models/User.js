const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamInfo: {
    id: String,
    persona: String,
    profileUrl: String,
    avatar: String,
    personaState: String,
    visibility: String
  },
  collectedInfo: {
    rank: String,
    reports: String
  }
});

mongoose.model("users", userSchema);
