const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set('view engine', 'pug')// we tell express that we want to compile dynamic templates with the pug engine
app.set('views', 'views') // and where to find those templates
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.router); //'/admin' adds a prefix to all routes in the dminRoutes file, with that you can filtering paths
app.use(shopRoutes);

app.use((req, res, next) => {
  //   res.status(404).send("<h1>Page not found</h1>");
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  //don't need to add '../' here because we in the app.js file and the __dirpath will point to whole project folder
});
app.listen(3000);
