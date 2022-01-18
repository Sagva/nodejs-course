const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/add-product", (req, res, next) => {
  // res.send('<form action="/product" method="POST"><input type="text" name="title"> <button type="submit">Add a product</button></input></form>')
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});
router.post("/product", (req, res, next) => {
  console.log("req.body", req.body);
  res.redirect("/");
});

module.exports = router;
