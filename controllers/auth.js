exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split("=")[1]; //getting cookie
  console.log(`isLoggedIn:${isLoggedIn}cvcv`);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true"); //setting cookie
  res.redirect("/");
};
