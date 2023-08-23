const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_FILE, 'utf8');

module.exports = (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization missing' });
  }

  const token = authorization.split(' ')[1]
  jwt.verify(token, publicKey, {algorithms: ['RS256']} ,(err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired access token' });
    }

    req.user = decoded.username;
    next();
  });
};
