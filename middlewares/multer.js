const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "tmp",
  filename: function (req, file, cb) {
    const fileExtention = path.parse(file.originalname).ext;
    cb(null, uuidv4() + fileExtention);
  },
});

const upload = multer({ storage });

module.exports = upload;
