const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");

const contactsRouter = require("./contacts/contacts.router");
const authRouter = require("./auth/auth.router");
const userRouter = require("./users/users.router");

require("dotenv").config();

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    await this.initDatabase();
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
    this.server.use("/api/auth", authRouter);
    this.server.use("/api/user", userRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log(
        `Server started successful. Listening on port: ${process.env.PORT}`
      );
    });
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(error);
      process.exit(1);
    }
  }
};
