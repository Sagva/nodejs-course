const expect = require('chai').expect
const sinon = require('sinon') 

const User = require('../models/user')
const AuthController = require('../controllers/auth')

const mongoose = require("mongoose");//for connecting to test dedicated DB

describe('Auth Controller - login', function() {
    it('should throw an error with code 500 if accessing the database fails', function(done) { //done is for testing asyncromous code
        sinon.stub(User, 'findOne')
        User.findOne.throws()

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        }
        AuthController.login(req, {}, ()=> {})
        .then(result => {
            console.log(`result`, result)
            expect(result).to.be.an('error')
            expect(result).to.have.property('statusCode', 500)
            done() // We signal that we want Mocha to wait for the code above to execute because before it treats this test case as doen
        })
        User.findOne.restore()

    })

    it('Should send a response with a valid user status for an existing user', function(done) {
        mongoose.connect( "mongodb+srv://Elena:JljPW4wROYq3gzT9@cluster0.w6ofb.mongodb.net/test-messages?retryWrites=true&w=majority")
        .then((result) => {
            //creating a dummy user
           const user = new User({
               email: 'test@test.com',
               password: 'tester',
               name: 'test',
               posts: []
           })
           return user.save()
           then(()=>{
               
           })
          })
        .catch((err) => console.log(err));
    })
})