const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose"); //for connecting to test dedicated DB

const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function () {
  before(function (done) {
    //connecting to DB
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

  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: "Test post",
        content: "a test post",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34728a",
    };

    const res = {
      status: function () {
        return this; //we return another reference to ebtire object that has
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    //cleaning up - deleting the cteated user, so we can use same id again
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
