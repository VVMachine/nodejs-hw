const DButils = require("./contacts.utils");

class ContactsController {
  async getContacts(req, res) {
    const contacts = await DButils.listContacts();

    res.status(200).send(contacts);
  }

  async getContactById(req, res) {
    const contactId = parseInt(req.params.id);
    const contact = await DButils.getContactById(contactId);

    if (!contact) {
      return res.status(404).send({ moessage: "Not found" });
    }

    res.status(200).send(contact);
  }

  async addContact(req, res) {
    const newArray = await DButils.addContact(req.body);

    res.status(201).send(newArray);
  }

  async removeContact(req, res) {
      const contactId = parseInt(req.params.id);
      const contact = await DButils.getContactById(contactId);

      if (contact) {
        DButils.removeContact(contactId)
        res.status(200).send({message: "contact deleted"})
        return;
      }
      
      res.status(404).send({ moessage: "Not found" })

  }


  async patchContact(req, res) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: 'missing fields' });
        return;
      }

      const contactId = parseInt(req.params.id);
      const contact = await DButils.getContactById(contactId);

      if (!contact) {
        res.status(404).send({ message: 'Contact not found' });
        return;
      }

      const patchContact = await DButils.patchContact(contactId, req.body)

      res.status(200).send(patchContact)

  }

}

module.exports = new ContactsController();
