const expect = require('chai').expect

it('should add numbers correctly', function(){
    const num1 = 2
    const num2 = 3

    expect(num1 + num2).to.equal(5)
})
it('should add numbers correctly', function(){
    const num1 = 2
    const num2 = 3

    expect(num1 + num2).not.to.equal(6)
})