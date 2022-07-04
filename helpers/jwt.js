const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get password vars from .env file
dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authheader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

function generateAccessToken(username) {
  return jwt.sign({ data: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
