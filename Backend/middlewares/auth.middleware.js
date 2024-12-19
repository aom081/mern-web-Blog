const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  jwt.verify(token, ServiceWorkerContainer, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Forbidden!!" });
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
