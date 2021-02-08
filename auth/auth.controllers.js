const userModel = require("../users/users.model");
const {
  ConflictError,
  UnauthorizedError,
} = require("../helpers/error.helpers");
const avatarBuilder = require("../helpers/avatar.builder");
const { v4: uuidv4 } = require("uuid");
const sendEmailVerification = require("../helpers/nodemail.sender");
const { verify } = require("jsonwebtoken");

class AuthController {
  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const existedEmail = await userModel.userByEmail(email);

      if (existedEmail) {
        throw new ConflictError("Email in use");
      }

      const passHash = await userModel.brcPassHash(password);

      const avatar = await avatarBuilder();
      const avatarURL = `http://localhost:${process.env.PORT}/images/${avatar}`;

      const user = await userModel.create({
        email,
        password: passHash,
        avatarURL,
      });

      const verificationToken = uuidv4();

      await user.createVerificationToken(verificationToken);

      await sendEmailVerification(user.email, verificationToken);

      return res.status(201).send({
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userModel.userByEmail(email);

      if (!user) {
        throw new UnauthorizedError("Email or password is wrong");
      }

      const token = await user.checkUser(password);

      res.status(200).send({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const user = req.user;
      await user.updateToken("");

      return res.status(204).send({
        message: "Successul unaautorized",
      });
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { verificationToken } = req.params;

      const user = await userModel.findByVerificationToken(verificationToken);

      if (!user) {
        return res.send(404).send("User not found!");
      }

      await user.removeVerificationToken();

      return res.status(200).send("Verified");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
