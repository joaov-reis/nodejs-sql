const jwt = require("jsonwebtoken");
const list = {};

function getToken(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "");
  return token;
}

function verifyJWT(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  
  if (list[token]) {
    return res.status(401).json({ message: "Token invalidated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.student = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function invalidateToken(token) {
  list[token] = true;
  setTimeout(() => {
    delete list[token];
  }, process.env.JWT_EXPIRES * 1000);
}

module.exports = {
  verifyJWT,
  getToken,
  invalidateToken,
};
