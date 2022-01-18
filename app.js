const http = require('http')


const server = http.createServer((req, res) => {
    // console.log('req', req)
    console.log('req.method', req.method)
    console.log('req.headers', req.headers)
    console.log('req.url', req.url)
    //  process.exit()
})

server.listen(3000)