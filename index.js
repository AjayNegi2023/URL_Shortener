const express = require("express");
const cookieParser = require("cookie-parser")

const urlRouter = require("./Routes/url");
const staticRouter = require("./Routes/StaticRoutes.js")
const userRouter = require("./Routes/UserRoutes.js");

const URL = require("./Models/URL.js");
const path = require('path');
require('dotenv').config();
const {
  connectToMongoDB
} = require("./Connection.js");
const {
  restrictUser,
  chechAuth
} = require("./middleware/auth.js");
const app = express();
const PORT = 8000;


//SSR
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"));


const mongo_URL = process.env.MONGO_DB;
console.log(mongo_URL)
connectToMongoDB(mongo_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB error " + error);
  });


app.use(express.json()); // to get the data req.body
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/url", restrictUser, urlRouter);
app.use("/", chechAuth, staticRouter);

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});