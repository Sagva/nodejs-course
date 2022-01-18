const express = require("express");
const path = require("path"); //path is a core module
const router = express.Router();

router.get("/", (req, res, next) => {
  // res.send('<h1>Hello from Express</h1>')
  //instead of writing and sending html here we will send a html-file that we created before
  // res.sendFile('/views/shop.html') we want to build a path like that
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  //__dirname - global variable that holds the absolute path in the operating system to the folder where we use it
  //dirname will point to routes-folder,
  // ../ means go up one level, so it will point to entire project folder
  
});

module.exports = router;
