const Avatar = require("avatar-builder");
const { v4: uuidv4 } = require("uuid");

const { promises: fsPromises } = require("fs");
const path = require("path");

async function avatarBuilder() {
  const avatar = Avatar.male8bitBuilder(128);

  const avatarImg = await avatar.create("gabriel");
  const avatarName = `${uuidv4()}.png`;

  const avatarPath = path.join("tmp", avatarName);

  await fsPromises.writeFile(avatarPath, avatarImg);

  const publicPath = path.join("public", "images", avatarName);
  await fsPromises.copyFile(avatarPath, publicPath);

  return avatarName;
}

module.exports = avatarBuilder;
