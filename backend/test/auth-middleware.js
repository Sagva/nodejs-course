
const expect = require('chai').expect
const authMiddleware = require('../middleware/is-auth')
const jwt = require('jsonwebtoken')

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
    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz'
            }
        }

        expect(authMiddleware.bind(this, {}, ()=> {})).to.throw() 
    })
    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer xsdfsdfssdfyz'
            }
        }
        jwt.verify = function() {//we're globaly overwriting the actual verify method that this package has => in all other authMiddleware tests that come after that line  it will work wrong 
            return {userId: 'abc'} //we will get userId in the authMiddleware => test will pass
            //instead of manually stabbing or mocking functionalities and replacing them it's better to use packages that allows you to restore gte original setup
        }
        authMiddleware(req, {}, ()=> {})
        expect(req).to.have.property('userId') //we expect that property because we are addng it in the authMiddleware  
    })



})
