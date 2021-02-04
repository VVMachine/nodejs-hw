const userModel = require("../users/users.model");
const {
  ConflictError,
  UnauthorizedError,
} = require("../helpers/error.helpers");
const avatarBuilder = require("../helpers/avatar.builder");

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

      const {
        _id: id,
        email: userEmail,
        subscription,
        avatarURL: userAvatar,
        token,
      } = await userModel.create({
        email,
        password: passHash,
        avatarURL,
      });

      return res.status(201).send({
        user: {
          email: userEmail,
          subscription,
          avatarURL: userAvatar,
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
}

module.exports = new AuthController();
