const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose"); //for connecting to test dedicated DB

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller", function () {
  //before only executes once, not before every test, all tests will run after before,
  before(function (done) {
    //if you execute async code in the function that passed into before you need to pass done to that function
    mongoose
      .connect(
        "mongodb+srv://Elena:JljPW4wROYq3gzT9@cluster0.w6ofb.mongodb.net/test-messages?retryWrites=true&w=majority"
      )
      .then((result) => {
        //creating a dummy user
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function () {}); //runs before every test

  afterEach(function () {}); //runs after every test

  it("should throw an error with code 500 if accessing the database fails", function (done) {
    //done is for testing asyncromous code
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };
    AuthController.login(req, {}, () => {}).then((result) => {
      // console.log(`result`, result)
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done(); // We signal that we want Mocha to wait for the code above to execute because before it treats this test case as doen
    });
    User.findOne.restore();
  });

  it("Should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "5c0f66b979af55031b34728a" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new!");
      done();
    });
  });

  //after will run after all test cases
  after(function (done) {
    //if the func execute async code don't forget to use done and call it in the end
    User.deleteMany({}) //cleaning up - deleting the cteated user, so we can use same id again
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
