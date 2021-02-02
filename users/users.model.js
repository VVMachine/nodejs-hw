const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../helpers/error.helpers");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String, default: "" },
});

userSchema.statics.brcPassHash = brcPassHash;
userSchema.statics.userByEmail = userByEmail;
userSchema.methods.checkUser = checkUser;
userSchema.methods.updateToken = updateToken;
userSchema.statics.verifyToken = verifyToken;

function brcPassHash(password) {
  return bcrypt.hash(password, 3);
}

async function userByEmail(email) {
  return this.findOne({ email });
}

async function checkUser(password) {
  const isPassValid = await bcrypt.compare(password, this.password);

  if (!isPassValid) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 24 * 60 * 60,
  });

  await this.updateToken(token);

  return token;
}

async function updateToken(token) {
  return userModel.findByIdAndUpdate(this._id, {
    token,
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;