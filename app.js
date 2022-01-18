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

    if (url === '/message' && method === 'POST') {//listening a request with method POST at localhost:3000/message 
        const body = [];
        req.on('data', (chunk) => { //registering an eventListener, starts on 'data' event.
          console.log(chunk); //listener recieves a chunk of data
          // chunk: <Buffer 6d 65 73 73 61 67 65 3d 64 66 67 64 67>
          body.push(chunk); //listener will execute this code so often until it done getting all data
        });
        req.on('end', () => {//listens when its done with getting data
          const parsedBody = Buffer.concat(body).toString(); //Buffer obj is available globaly
          console.log(`parsedBody`, parsedBody) // message=hhgf,message because we named input field 'message' key=value pair 
          const message = parsedBody.split('=')[1]; //delete message=, take only value (hhgf in our case)
          fs.writeFileSync('message.txt', message); //create a file with value inside of it
        });
        res.statusCode = 302;
        res.setHeader('Location', '/'); //redirection
        return res.end();
      }
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('</html>');
      res.end();

})

server.listen(3000)