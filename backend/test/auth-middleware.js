
const expect = require('chai').expect
const authMiddleware = require('../middleware/is-auth')

// unit test, testing only one function
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