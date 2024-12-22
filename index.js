const express = require("express");
const path = require("path");
const PORT = 8001;
const cookieParser = require("cookie-parser")
const { connectToMongo } = require("./connection.js");
const app = express();

const urlRoute = require("./routes/urlRoute")
const staticRoute = require("./routes/staticRoute.js")
const userRoute = require("./routes/userRoute.js");
const { authenticateUser } = require("./middlewares/auth.js");

//call connection to connect to Mongo
connectToMongo();

//use views to create server side rendered pages - Note: This is faster as compared to client-side rendering
app.set("view engine", "ejs");//determining the view engine to be used
app.set("views", path.resolve("./views"));//telling the engine where to render the views from

//some middlewares to process the input body
app.use(express.json()); //allows processing of json body
app.use(express.urlencoded({ extended: false })) //allows processing of HTML form data without processing
app.use(cookieParser());

//using different routes as middlewares. req will be sent to them if the path matches
app.use("/user",userRoute);
app.use("/url", authenticateUser, urlRoute);
app.use("/", staticRoute);

//PORT on which the express app listens for requests
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));