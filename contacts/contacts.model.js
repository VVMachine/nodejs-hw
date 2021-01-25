const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => value.includes("@"),
  },
  phone: { type: String, required: true },
  subscription: { type: String },
  password: { type: String, required: true, min: 8 },
});


const contactModel = mongoose.model('Contact', contactsSchema);

module.exports = contactModel;