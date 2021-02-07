const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../helpers/error.helpers");
const { func } = require("joi");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarURL: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String, default: "" },
  verificationToken: { type: String },
});

userSchema.statics.brcPassHash = brcPassHash;
userSchema.statics.userByEmail = userByEmail;
userSchema.methods.checkUser = checkUser;
userSchema.methods.updateToken = updateToken;
userSchema.statics.verifyToken = verifyToken;
userSchema.methods.updateAvatar = updateAvatar;
userSchema.methods.createVerificationToken = createVerificationToken;
userSchema.statics.findByVerificationToken = findByVerificationToken;
userSchema.methods.removeVerificationToken = removeVerificationToken;

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

async function updateAvatar(avatar) {
  return userModel.findByIdAndUpdate(
    this._id,
    {
      avatarURL: `http://localhost:${process.env.PORT}/images/${avatar}`,
    },
    { new: true }
  );
}

async function createVerificationToken(verificationToken) {
  return userModel.findByIdAndUpdate(
    this._id,
    {
      verificationToken,
    },
    {
      new: true,
    }
  );
}

async function findByVerificationToken(verificationToken) {
  return this.findOne({ verificationToken });
}

async function removeVerificationToken() {
  return userModel.findByIdAndUpdate(this._id, {
    verificationToken: null,
  });
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
