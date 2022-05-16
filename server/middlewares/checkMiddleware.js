function checkMiddleware(req, res, next) {
  if (!req.session || !req.session.accountid) {
    return res.json({ loggedIn: false });
  }
  next();
}

module.exports = checkMiddleware;
