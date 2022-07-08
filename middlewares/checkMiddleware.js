function checkMiddleware(req, res, next) {
  if (!req.session || !req.session.accountid) {
    return res
      .status(400)
      .json({ loggedIn: false, message: "You are not logged in!" });
  }
  next();
}

module.exports = checkMiddleware;
