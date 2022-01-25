exports.getPosts = (req, res, next) => {
    res.status(200).json({posts: [
        {
            _id: '1',
            title: 'First post', 
            content: 'THis is the first post',
            imageUrl: 'images/book.png',
            creator: {
                name: 'Elena',
            },
            createdAt: new Date()
        }
    
    ]})
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
