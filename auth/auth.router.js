const { Router } = require("express");
const authValidators = require("./auth.validators");
const AuthController = require("./auth.controllers");
const { autorization } = require("../middlewares/autorization");

const authRouter = Router();

authRouter.post(
  "/register",
  authValidators.validateUserData,
  AuthController.createUser
);

authRouter.post(
  "/login",
  authValidators.validateUserData,
  AuthController.login
);

authRouter.post("/logout", autorization, AuthController.logout);

authRouter.get("/verify/:verificationToken", AuthController.verifyEmail);

module.exports = authRouter;
