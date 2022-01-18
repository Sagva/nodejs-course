const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //   res.status(404).send("<h1>Page not found</h1>");
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  //don't need to add '../' here because we in the app.js file and the __dirpath will point to whole project folder
});
app.listen(3000);
