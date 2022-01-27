
const expect = require('chai').expect
const authMiddleware = require('../middleware/is-auth')
const jwt = require('jsonwebtoken')
const sinon = require('sinon') // package that allows us to create a so-called step, which is a replacement for the original function where we can easily restore the original function.

//describe function is for grouping the tests
describe('Auth middleware', function() { //now in the termonal we can 

    it('should throw an error if no authorization header is present', function() {
        //we create a dummy request
        const req = {
            get: function() {//we want to test scenario when get authorization does not return an authorization header 
                return null//it does not return a value for our authorization call 
            }
        }

        expect(authMiddleware.bind(this, req, {}, ()=> {}))   //second arg - response object , 3d: next func which we don't execute
        .to.throw('Not authenticated')
    })

    it('should throw an error if the authorizantion header is only obe string', function() {
        const req = {
            get: function() {
                return 'xyz'
            }
        }

        expect(authMiddleware.bind(this, {}, ()=> {})).to.throw() //bind does that we are not calling authMiddleware here, but reference to it 
        // expect(authMiddleware.bind(this, {}, ()=> {})).not.to.throw() //will not pass because it will be error and we are saying that we are not expecting an error
    })

    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer xsdfsdfssdfyz'
            }
        }

        sinon.stub(jwt, 'verify') //two arguments: 1) JWT-the object that has the method, 2) verify is the actual method

        jwt.verify.returns({userId: 'abc'}) //returns is method added by simon, it allows us to configure what that function should return
        authMiddleware(req, {}, ()=> {})
        expect(req).to.have.property('userId') //we expect that property because we are addng it in the authMiddleware  
        expect(req).to.have.property('userId', 'abc') 
        expect(jwt.verify.called).to.be.true //check if the method was called in our authMiddleware

        jwt.verify.restore() // now the method will be restored to it original behavior
    })

    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz'
            }
        }

        expect(authMiddleware.bind(this, {}, ()=> {})).to.throw() 
    })
    



})
