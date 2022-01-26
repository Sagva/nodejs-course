const express = require("express");
const { body } = require("express-validator/check");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts - these kind of requests would get handled by this controller
router.get("/posts", isAuth, feedController.getPosts); //isAuth is a middleware

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put(
  //put requests have also body
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);
router.delete(
  //for delete requests we can't send a body
  "/post/:postId",
  isAuth,
  feedController.deletePost
);

module.exports = router;
