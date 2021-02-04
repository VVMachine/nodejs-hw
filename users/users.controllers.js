const userModel = require("../users/users.model");
const { UnauthorizedError } = require("../helpers/error.helpers");

class UserControllers {
  async getCurrentUser(req, res, next) {
    try {
      const { email, subscription, avatarURL } = req.user;
      return res.status(200).send({ email, subscription, avatarURL });
    } catch (err) {
      next(err);
    }
  }

  async updateUserAvatar(req, res, next) {
    try {
      const user = await userModel.userByEmail(req.user.email);

      if (!user) {
        throw new UnauthorizedError("Email or password is wrong");
      }

      const { filename } = req.file;

      const userWithNewAvatar = await user.updateAvatar(filename);

      res.status(200).send({
        avatarURL: userWithNewAvatar.avatarURL,
      });

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserControllers();
