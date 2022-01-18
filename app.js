const http = require('http')


const server = http.createServer((req, res) => {
    // console.log('req', req)
    // console.log('req.method', req.method)
    // console.log('req.headers', req.headers)
    // console.log('req.url', req.url)
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>Hello from Nodejs</h1></body>')
    res.write('</html>')
    res.end()

})

server.listen(3000)