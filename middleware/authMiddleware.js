const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).send("No token provided, authorization denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Token is not valid.");
  }
};

module.exports = { protect };
