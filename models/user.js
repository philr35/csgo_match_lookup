const mongoose = require("mongoose");

// const Schema = mongoose.Schema; is the same as below
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamId: String
});

mongoose.model("users", userSchema);
