require('dotenv').config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

//function to be called in case connection is to be made to the mongo database
async function connectToMongo() {
    await mongoose.connect(DB_URL).then(() => console.log("MongoDB connected successfully.")).catch((err) => console.log(`Error: ${err}`));
}

module.exports = {
    connectToMongo,
}