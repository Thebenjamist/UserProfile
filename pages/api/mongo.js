const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const userSchema = new Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
