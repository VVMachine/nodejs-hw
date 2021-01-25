const { Router } = require("express");
const ContactsController = require("./contacts.controllers");
const ContactsModel = require("./contacts.model");
const ContactsValidators = require("./contacts.validators");

const contactsRouter = Router();

contactsRouter.get("/", ContactsController.getContacts);

contactsRouter.get(
  "/:id",
  ContactsValidators.validateObjectId,
  ContactsController.getContactById
);

contactsRouter.post(
  "/",
  ContactsValidators.validateNewContact,
  ContactsController.createContact
);

contactsRouter.delete(
  "/:id",
  ContactsValidators.validateObjectId,
  ContactsController.removeContact
);

contactsRouter.patch(
  "/:id",
  ContactsValidators.validateObjectId,
  ContactsValidators.validatePatchContact,
  ContactsController.patchContact
);

module.exports = contactsRouter;
