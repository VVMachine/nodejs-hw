const { Router } = require("express");
const ContactsController = require("../controllers/controllers");
const ContactsValidators = require("../utils/validators");

const contactsRouter = Router();

contactsRouter.get("/", ContactsController.getContacts);

contactsRouter.get("/:id", ContactsController.getContactById);

contactsRouter.post(
  "/",
  ContactsValidators.validateNewContact,
  ContactsController.addContact
);

contactsRouter.delete("/:id", ContactsController.removeContact);

contactsRouter.patch("/:id",
ContactsValidators.validatePatchContact,
ContactsController.patchContact,
    )

module.exports = contactsRouter;
