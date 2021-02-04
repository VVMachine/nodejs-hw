const { promises: fsPromises } = require("fs");
const path = require("path");

async function makeAvaPublic(req, res, next) {
  const publicPath = path.join("public", "images", req.file.filename);

  fsPromises.copyFile(req.file.path, publicPath);
}

module.exports = {
  makeAvaPublic,
};
