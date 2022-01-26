const express = require("express");
const { body } = require("express-validator/check");

const feedController = require("../controllers/feed");
const router = express.Router();

// GET /feed/posts - these kind of requests would get handled by this controller
router.get("/posts", feedController.getPosts);

router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", feedController.getPost);
router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
); //put requests have also body

module.exports = router;
