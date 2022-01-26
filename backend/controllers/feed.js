const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");
const post = require("../models/post");

const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = async (req, res, next) => {
  //pagination
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find() //fetching actusl posts fron DB
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error; //it will automatically exit the function execution (of createPost) and instead try to reach the next error handling or err.handling middleware provided in the express application.
  }

  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace(/\\/g, "/");
  const title = req.body.title;
  const content = req.body.content;
  let creator;

  const post = new Post({
    //create post in db
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });
  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        //check if we have an error status. If not - add it
        err.statusCode = 500; //server-side error
        // throw error throwing an error will not do the trick, it will not reach the next error handling middleware. Instead we have do use next(err)
        next(err); //will reach the next error handling express middleware. In app.js we need to register that middleware
      }
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId; //this propery name (postId) has to match exactly to name we assign in the route "/post/:postId" (after the colon)

  //find the post with extructed postId in the DB
  Post.findById(postId)
    .populate("creator")
    .then((post) => {
      if (!post) {
        //if the post is not found
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error; //if you throw an error inside of a "then" block, the next 'catch' block will be reached and that error will be passes as an error to the catch block
      }
      res.status(200).json({ message: "Post fetched", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;

  //check request data (rules are in the router file)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image; //if no new file was added, take existing url

  if (req.file) {
    //if a new file was uploaded
    imageUrl = req.file.path.replace(/\\/g, "/");
  }

  if (!imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }

  //here we know that we have valid data so we can update it
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        //if the post is not found
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      //the post was found
      if (imageUrl !== post.imageUrl) {
        //if a new image was uploaded
        clearImage(post.imageUrl); //deliting old image
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post updated!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId) //we are not using findAndDelete because we want to check if the user have rights to delete the post (if the user reated it earlier)
    .then((post) => {
      if (!post) {
        //if the post is not found (is undefind)
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }

      //check logged in user
      clearImage(post.imageUrl); //deliting the image

      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId); //deleting post from user's collection from DB
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post was deleted!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

const clearImage = (filePath) => {
  //helping function for deleting images
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
