const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routers/feed");

const app = express();

app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images"))); //construct an absolute path to the images folder. that is the folder we'll serve statically for requests going to '/images'

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => { //general error handling functionality 
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message; //this property exists bt default and it holds the message you pass to the constructor of the error object
  res.status(status).json({message: message});
});

mongoose
  .connect(
    "mongodb+srv://Elena:NODE123456node@cluster0.w6ofb.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
