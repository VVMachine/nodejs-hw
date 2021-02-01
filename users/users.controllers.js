class UserControllers {
  async getCurrentUser(req, res, next) {
    try {
      const { email, subscription } = req.user;
      return res.status(200).send({ email, subscription });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserControllers();
