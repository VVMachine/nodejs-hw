const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function getData(pathToFile) {
  const data = await fsPromises.readFile(pathToFile, "utf-8");
  const dataArr = JSON.parse(data);
  return dataArr;
}

async function setData(pathToFile, dataToWrite) {
  const data = JSON.stringify(dataToWrite);
  await fsPromises.writeFile(pathToFile, data);

  const newData = await fsPromises.readFile(pathToFile, "utf-8");
  const newDataArr = JSON.parse(newData);
  return newDataArr;
}

async function listContacts() {
  const data = await getData(contactsPath);
  return data;
}

async function getContactById(contactId) {
  const data = await getData(contactsPath);
  const contact = data.find((contact) => contactId === contact.id);
  return contact;
}

async function removeContact(contactId) {
  const data = await getData(contactsPath);
  const newArray = data.filter((contact) => contactId !== contact.id);

  const newData = await setData(contactsPath, newArray);
  return newData;
}

async function addContact(contact) {
  const { name, email, phone } = contact;

  const data = await getData(contactsPath);

  const maxId = data[data.length - 1].id;

  const newContact = {
    id: maxId + 1,
    name,
    email,
    phone,
  };

  const newArray = [...data, newContact];

  const newData = await setData(contactsPath, newArray);

  return newData;
}

async function patchContact(id, newContactData) {
  const data = await getData(contactsPath);

  const newDataArray = data.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        ...newContactData,
      };
    }

    return contact;
  });

  
  const newData = await setData(contactsPath, newDataArray);

  return newData;


}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  patchContact,
};
