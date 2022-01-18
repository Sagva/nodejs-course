const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if(url === '/') { //listen a request at localhost:3000

        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><h1>Hello from Nodejs</h1> <form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/message' && method === 'POST') { //listen a request at localhost:3000/message
        fs.writeFileSync('message.txt', 'dummy text') //create a file with "dummy text" inside of it
       res.statusCode = 302; 
       res.setHeader('Location', '/') //redirection
       return res.end()
    }
})

server.listen(3000)