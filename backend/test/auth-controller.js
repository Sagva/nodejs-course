const expect = require('chai').expect
const sinon = require('sinon') 

const User = require('../models/user')
const AuthController = require('../controllers/auth')

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
})