const { Router } = require("express");
const { autorization } = require("../middlewares/autorization");

const upload = require("../middlewares/multer");

const UserControllers = require("./users.controllers");
const { makeAvaPublic } = require("../middlewares/makePublicAvatar");

const userRouter = Router();

userRouter.get("/current", autorization, UserControllers.getCurrentUser);

userRouter.patch(
  "/avatars",
  autorization,
  upload.single("avatar"),
  UserControllers.updateUserAvatar,
  makeAvaPublic
);

module.exports = userRouter;
