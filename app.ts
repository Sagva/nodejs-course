// const express = require('express') //require method is only availablewhen we're running this code with Node.
//If we would want to run it in the browser, this does not exist. TypeScript does not know where we plan to run this code,
//to let TypeScript know that require method exists,we can run this command npm install --save-dev @types/node

// import express = require('express') or
import express from 'express' //will compiled to require('express') 

const app = express()

app.listen({port: 3000})