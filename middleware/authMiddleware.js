import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).send("No token provided, authorization denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    res.status(400).send("Token is not valid.");
  }
};
