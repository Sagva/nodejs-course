const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')
const flash = require("connect-flash")

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://Elena:NODE123456node@cluster0.w6ofb.mongodb.net/shop";

const app = express();

// Create DB Store
const store = new MongoDBStore(
  {
    uri: MONGODB_URI,
    collection: "sessions",
  },
  (error) => console.log(error)
);

const csrfProtection = csrf() //csrfProtection middleware, uses after we initialized the session
app.use(flash())// registring middleware. Now we can use it in any place of the app

// Catch errors
store.on("error", (error) => console.log(error));

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection)

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if(!user) { //in this case we will not save undefined object 
        next()
      }
      console.log(`user`, user);
      req.user = user;
      next();
    })
    .catch((err) => {//catch block will not fire the user with this ID will not be found
      //it will only fire if there are any technical issues: if the database is down or if the user of this app does not have permissions to execute this action.
     
      throw new Error(err)
    }); 
});

app.use((req, res, next) => { //for every reques that is executed these two firlds will be set for the views that are rendered
  res.locals.isAuthenticated = req.session.isLoggedIn,
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)

app.use(errorController.get404);

app.use((error, req, res, next) => { //Express knows a middleware with four arguments, a 
  //so-called error handling middleware and there, the first argument will be the error followed by the other three arguments.
  // express detects that this is a special kind of middleware and it will move right away
  // to these error handling middlewares when you call next with an error passed to it, so it will then
  // skip all the other middlewares and move to that
  res.redirect('/500')
})

mongoose 
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
