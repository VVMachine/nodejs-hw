const { Router } = require("express");
const { autorization } = require("../middlewares/autorization");

const UserControllers = require("./users.controllers");

const userRouter = Router();

userRouter.get("/current", autorization, UserControllers.getCurrentUser);

module.exports = userRouter;
