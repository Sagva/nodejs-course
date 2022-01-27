const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log(`in the signup in backend`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User created",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  try {
  
  const user = await user.findOne({ email: email })
  if (!user) {
    const error = new Error("A user ith this email could not be found");
    error.statusCode = 401;
    throw error;
  }
  
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error("Wrong password");
    error.statusCode = 401;
    throw error;
  }
  
  // password is correct, generate token
  const token = jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString(),
    },
    "somesupersecretsecret",
    { expiresIn: "1h" } //token becomes invalid after 1h
  );
  res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    return
  }
  catch(err)  {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err
  }

};
