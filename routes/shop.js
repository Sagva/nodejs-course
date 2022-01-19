const express = require("express");
const path = require("path"); //path is a core module
const router = express.Router();
const rootDir = require("../utils/path");

const adminData = require('./admin')
console.log(`adminData.products`, adminData.products);


router.get("/", (req, res, next) => {
  const products = adminData.products
  //res.sendFile(path.join(rootDir, "views", "shop.html"));
  // befole we sent a html file, now we are using templating engine Pug
  res.render('shop', {prods: adminData.products, docTitle: 'Shop'}) // to take the template where
});

module.exports = router;
