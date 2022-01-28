"use strict";
// const express = require('express') //require method is only availablewhen we're running this code with Node.
//If we would want to run it in the browser, this does not exist. TypeScript does not know where we plan to run this code,
//to let TypeScript know that require method exists,we can run this command npm install --save-dev @types/node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express = require('express') or
const express_1 = __importDefault(require("express")); //will compiled to require('express') 
const app = (0, express_1.default)();
app.listen({ port: 3000 });
