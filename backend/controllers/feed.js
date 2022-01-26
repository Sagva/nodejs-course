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
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect",
      errors: errors.array(),
    });
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
    .catch((err) => console.log(err));
};
