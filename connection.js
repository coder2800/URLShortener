const mongoose = require("mongoose")

async function connectToMongo() {
    await mongoose.connect("mongodb://localhost:27017/testing").then(() => console.log("MongoDB connected successfully.")).catch((err) => console.log(`Error: ${err}`));
}

module.exports = {
    connectToMongo,
}