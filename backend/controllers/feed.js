const { validationResult } = require("express-validator/check");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First post",
        content: "THis is the first post",
        imageUrl: "images/book.png",
        creator: {
          name: "Elena",
        },
        createdAt: new Date(),
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error; //it will automatically exit the function execution (of createPost) and instead try to reach the next error handling or err.handling middleware provided in the express application.
  }

  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    //create post in db
    title: title,
    content: content,
    imageUrl: "umages/book.png",
    creator: {
      name: "Elena",
    },
  });
  post
    .save()
    .then((result) => {
      console.log(`result`, result);
      res.status(201).json({
        // 200 - just success, 201 - success, a resource was created
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; //server-side error
        // throw error throwing an error will not do the trick, it will not reach the next error handling middleware. Instead we have do use next(err)
        next(err); //will reach the next error handling express middleware. In app.js we need to register that middleware
      }
    });
};
