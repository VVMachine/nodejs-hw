const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");

function validateNewContact(req, res, next) {
  const newContactValidation = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    subscription: Joi.string().required(),
    password: Joi.string().min(8).required(),
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
    subscription: Joi.string(),
    password: Joi.string().min(8),
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

function validateObjectId(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send();
  }

  next();
}

module.exports = {
  validateNewContact,
  validatePatchContact,
  validateObjectId,
};
