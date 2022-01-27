const path = require("path");

const express = require("express");
const bodyParser = require("body-parser"); //For parsing incoming request bodies 
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf"); // for security. Package allows to generate csrf-token that we can embed into forms for every request. On the server this package will check if the request has tthe valid token
const flash = require("connect-flash"); //for providing users feedback, e.g. for showing error messages
const multer = require("multer"); //for handling form-data, which is used for uploading files
const helmet = require("helmet"); // Helmet helps to secure the Express apps by setting various HTTP headers.

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.w6ofb.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();

// Create DB Store
const store = new MongoDBStore(
  {
    uri: MONGODB_URI,
    collection: "sessions",
  },
  (error) => console.log(error)
);

const csrfProtection = csrf(); //csrfProtection middleware, uses after we initialized the session
app.use(flash()); // registring middleware. Now we can use it in any place of the app

// Catch errors
store.on("error", (error) => console.log(error));

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); //accept the file
  } else {
    cb(null, false); // not accept the file
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); //'image' is a name of input field type='file'
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        //in this case we will not save undefined object
        next();
      }
      // console.log(`user`, user);
      req.user = user;
      next();
    })
    .catch((err) => {
      //catch block will not fire the user with this ID will not be found
      //it will only fire if there are any technical issues: if the database is down or if the user of this app does not have permissions to execute this action.

      throw new Error(err);
    });
});

app.use((req, res, next) => {
  //for every reques that is executed these two firlds will be set for the views that are rendered
  (res.locals.isAuthenticated = req.session.isLoggedIn),
    (res.locals.csrfToken = req.csrfToken());
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  //Express knows a middleware with four arguments, a
  //so-called error handling middleware and there, the first argument will be the error followed by the other three arguments.
  // express detects that this is a special kind of middleware and it will move right away
  // to these error handling middlewares when you call next with an error passed to it, so it will then
  // skip all the other middlewares and move to that
  res.redirect("/500");
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
