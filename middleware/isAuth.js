const isAuth = (req, res, next) => {
  console.log(req.cookies.authId);
  const authorized = req.query.authorized;
  if (authorized || req.cookies.authId) {
    return next();
  } else {
    res.render("auth/auth", {
      pageTitle: "Authentication Needed",
      selected: "none",
      returnUri: req.originalUrl,
      errorMsg: "",
    });
  }
}

module.exports = isAuth;