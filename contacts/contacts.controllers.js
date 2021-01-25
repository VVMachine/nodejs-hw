const contactModel = require("./contacts.model");

class ContactsController {
  async createContact(req, res, next) {
    try {
      const contact = await contactModel.create(req.body);

      return res.status(201).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async getContacts(req, res, next) {
    try {
      const contact = await contactModel.find({});

      return res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const { id } = req.params;

      const contact = await contactModel.findOne({ _id: id });

      if (!contact) {
        return res.status(404).send();
      }

      return res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async removeContact(req, res, next) {
    try {
      const { id } = req.params;

      const deletedContact = await contactModel.findByIdAndDelete({ _id: id });

      if (!deletedContact) {
        return res.status(404).send({ message: "contact not found"});
      }

      return res.status(204).send({ message: "successful deleted"});
    } catch (err) {
      next(err);
    }
  }

  async patchContact(req, res, next) {
    try {
      const { id } = req.params;

      const updatedContact = await contactModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      if (!updatedContact) {
        return res
          .status(404)
          .send({ message: "contact not found"});
      }

      return res.status(204).send({ message: "contact successfully updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ContactsController();
