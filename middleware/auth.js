const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  // check for token
  if (!token) return res.status(401).json({ msg: "Unauthorized!" });

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload. actually add user to req.user
    req.user = decoded;
    next();
  } catch (error) {
      res.status(400).json({ msg: "Token is not valid!" });
  }
}
module.exports = auth;

/*
// Middleware 2 - Bearer Token
function auth(req, res, next) {
  const header = req.headers["authorization"];
  if(!header) res.status(401).json({ msg: "Unauthorized!" });
  
  const token = header.split("Bearer ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized!" });

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload. actually add user to req.user
    req.user = decoded;
    next();
  } catch (error) {
      res.status(400).json({ msg: "Token is not valid!" });
  }
}
*/