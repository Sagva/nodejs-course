const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../utils/path");

const products = []

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.send('<form action="/product" method="POST"><input type="text" name="title"> <button type="submit">Add a product</button></input></form>')
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/product => POST
router.post("/add-product", (req, res, next) => {
  console.log("req.body", req.body);
  products.push({title: req.body.title})
  res.redirect("/");
});

exports.router = router
exports.products = products
