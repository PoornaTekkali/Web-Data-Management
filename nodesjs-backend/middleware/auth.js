// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verifyToken) {
//       return res.status(403).send("Forbidden");
//     }
//     req.locals = verifyToken.userId;
//     next();
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
//module.exports = auth;

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;


