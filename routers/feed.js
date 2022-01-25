const express = require('express')
const feedController = require('../controllers/feed')
const router = express.Router()

// GET /feed/posts - these kind of requests would get handled by this controller
router.get('/posts', feedController.getPosts)

router.post('/post', feedController.createPost)

module.exports = router