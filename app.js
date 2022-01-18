const http = require('http')

const express = require('express')

const app = express()

// app.use((req, res, next) => {
//     console.log('In the middleware')
//     next()
// })
app.use('/', (req, res, next) => {
    console.log('This always runs')
    
    next()
})
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Hello from Add product route</h1>')
})
app.use('/', (req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Hello from Express</h1>')
})



const server = http.createServer(app)

server.listen(3000)