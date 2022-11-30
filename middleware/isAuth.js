const isAuth = (req, res, next) => {
  const authorized = req.query.authorized;
  console.log(req.cookies.isAuthorized);
  if (authorized || req.cookies.isAuthorized) {
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