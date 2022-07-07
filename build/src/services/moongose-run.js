"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToMongoDB = connectToMongoDB;

const mongoose = require('mongoose');

async function connectToMongoDB() {
  const port = process.env.MONGO_PORT;
  const host = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DB_NAME;
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;

  if (user && password) {
    await mongoose.connect(`mongodb+srv://tombola_test:8KX*LT*Tsq9!5$G@cluster0.ly7p2l3.mongodb.net/?retryWrites=true&w=majority`);
  } else {
    await mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
  }
}