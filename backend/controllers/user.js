const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const db = require('../db');
const fs = require('fs');
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_FILE, 'utf8');
const refreshPrivateKey = fs.readFileSync(process.env.REFRESH_PRIVATE_KEY_FILE, 'utf8');
const refreshPublicKey = fs.readFileSync(process.env.REFRESH_PUBLIC_KEY_FILE, 'utf8');

function generateRefreshToken(issuer) {
  return jwt.sign({}, refreshPrivateKey, { expiresIn: '10d', algorithm: 'RS256', issuer });
}

function generateAccessToken(username) {
  return jwt.sign({ username }, privateKey, { expiresIn: '15m', algorithm: 'RS256' });
}

exports.register = (req, res) => {
  const { username, masterPassword } = req.body;

  // return if user exists
  db.get('SELECT * FROM users WHERE user = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (row) {
      return res.status(500).json({ error: 'Username not available' });
    }

    bcrypt.hash(masterPassword, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      const issuer = uuid.v4()
      const refreshToken = generateRefreshToken(issuer);

      db.run('INSERT INTO users (user, encrypted_master, refresh_token_issuer) VALUES (?, ?, ?)',
        [username, hashedPassword, issuer], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }

          const accessToken = generateAccessToken(username);

          res.json({ accessToken, refreshToken });
        });
    });
  });

};

exports.login = (req, res) => {
  const { username, masterPassword } = req.body;

  db.get('SELECT * FROM users WHERE user = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(masterPassword, row.encrypted_master, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const accessToken = generateAccessToken(username);

      const refreshToken = generateRefreshToken(row.refresh_token_issuer);

      res.json({ accessToken, refreshToken });
    });
  });
};


exports.refreshAccessToken = (req, res) => {
  const { refreshToken, username } = req.body;

  db.get('SELECT * FROM users WHERE user = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    jwt.verify(refreshToken, refreshPublicKey, { issuer: row.refresh_token_issuer, algorithms: ['RS256'] }, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }

      const accessToken = generateAccessToken(username);
      res.json({ accessToken });
    });
  });
};