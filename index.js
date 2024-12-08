const express = require("express");
const path = require("path");
const PORT = 8001;
const { connectToMongo } = require("./connection.js");
const urlRoute = require("./routes/urlRoute")
const staticRoute = require("./routes/staticRoute.js")
const app = express();

connectToMongo();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));