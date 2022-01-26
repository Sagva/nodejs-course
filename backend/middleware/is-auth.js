const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); //with get method we can get headers

  if (!authHeader) {
    //token was not even appended
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1]; //separeting 'Bearer ' from token itself
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;

  next();
};
