exports.getPosts = (req, res, next) => {
    res.status(200).json({posts: [{title: 'First post', content: 'THis is the first post'}]})// Json is a method provided by expressjs that allows us to conveniently return a response with json data, with the right headers being set.
}
exports.createPost = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content

    //create post in db
    res.status(201).json({// 200 - just success, 201 - success, a resource was created
        message: "Post created successfully!",
        post: {id: new Date().toLocaleString(), title: title, content: content} //data will be parsed from incomming request
    })
}
