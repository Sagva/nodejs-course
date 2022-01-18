const express = require("express");
const path = require("path"); //path is a core module
const router = express.Router();
const rootDir = require("../utils/path");
console.log(`rootDir`, rootDir);

router.get("/", (req, res, next) => {
  // res.send('<h1>Hello from Express</h1>')
  //instead of writing and sending html here we will send a html-file that we created before
  // res.sendFile('/views/shop.html') we want to build a path like that
  res.sendFile(path.join(rootDir, "views", "shop.html"));
  //rootDir gives the absolute path to the project folder (in the operating system)
});

module.exports = router;
