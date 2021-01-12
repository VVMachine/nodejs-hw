const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./routes/contactsRouter");

require("dotenv").config();

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: `http://localhost:${process.env.PORT}` }));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log(
        `Server started successful. Listening on port: ${process.env.PORT}`
      );
    });
  }
};
