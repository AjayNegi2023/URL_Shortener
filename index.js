const express = require("express");
const urlRouter = require("./Routes/url");
require('dotenv').config(); 
const {
  connectToMongoDB
} = require("./Connection.js");
const app = express();
const PORT = 8000;

const URL = process.env.MONGO_DB;
console.log(URL)
connectToMongoDB(URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB error " + error);
  });

app.use(express.json()); // to get the data req.body
app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});