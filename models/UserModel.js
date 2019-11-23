const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken")

const UserModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  created_at: Date
});

UserModel.pre("save", function(next) {
  if (this.isNew) this.password = bcrypt.hashSync(this.password);
  next();
});

UserModel.methods.generateToken = function(cb) {
  this.token = jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    "secret-key"
  );
  this.save();
};

module.exports = mongoose.model("user", UserModel);
