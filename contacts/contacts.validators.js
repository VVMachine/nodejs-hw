const Joi = require("joi");

function validateNewContact(req, res, next) {
  const newContactValidation = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
  });

  const validationResult = newContactValidation.validate(req.body);

  if (validationResult.error) {
    res
      .status(400)
      .send({ message: `Field ${validationResult.error.details[0].message}` });
    return;
  }

  next();
}

function validatePatchContact(req, res, next) {
  const newContactValidation = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email(),
    phone: Joi.string().min(10),
  });

  const validationResult = newContactValidation.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({ message: `Field ${validationResult.error.details[0].message}` });
    return;
  }

  next();
}

module.exports = {
  validateNewContact,
  validatePatchContact,
};
