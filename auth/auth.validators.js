const Joi = require("joi");

function validateUserData(req, res, next) {
  const newUserValidation = Joi.object({
    email: Joi.string().email().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const validationResult = newUserValidation.validate(req.body);

  if (validationResult.error) {
    res
      .status(400)
      .send({ message: `Field ${validationResult.error.details[0].message}` });
    return;
  }

  next();
}

module.exports = {
  validateUserData,
};
