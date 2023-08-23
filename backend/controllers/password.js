const db = require('../db');
const crypto = require('crypto');

const { deriveEncryptionKey, decryptPassword,encryptPassword } = require('../utils/crypto');

exports.getPassword = (req, res) => {
  const { id } = req.params;
  const user = req.user;

  // Retrieve the encrypted password and the associated encryption key from the database based on the user's access token
  // ...
  const query = `
    SELECT p.encrypted_password AS encrypted_password,
      u.encrypted_master AS encrypted_master,
      es.encryption_salt AS encryption_salt
    FROM passwords p
    JOIN users u ON p.user = u.user
    JOIN encryptionSalt es ON p.encryption_salt_id = es.id
    WHERE p.id = ? AND p.user = ?;
  `;

  db.get(query, [id, user], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!row) {
      return res.status(500).json({ error: 'No entry' });
    }

    const encryptionKey = deriveEncryptionKey(row.encrypted_master, row.encryption_salt);
    const decryptedPassword = decryptPassword(row.encrypted_password, encryptionKey);
    res.json({ password: decryptedPassword });
  });
};

exports.setPassword = (req, res) => {
  const { username, password, website } = req.body;
  const user = req.user;
  const salt = crypto.randomBytes(16)

  db.run('INSERT INTO encryptionSalt (encryption_salt) VALUES (?)',
    [salt], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal server error'});
      }

      const encryption_salt_id = this.lastID

      db.get('SELECT encrypted_master FROM users WHERE user = ?', [user], (err, row) => {
        if (err || !row) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        const encrypted_master = row.encrypted_master

        const encryptionKey = deriveEncryptionKey(encrypted_master, salt);
        const encrypted_password = encryptPassword(password, encryptionKey);

        db.run('INSERT INTO passwords (user, username, website, encrypted_password, encryption_salt_id) VALUES (?, ?, ?, ?, ?)',
        [user, username, website, encrypted_password, encryption_salt_id], function (err) {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }
          return res.status(200).json({ password_id: this.lastID });
        });

      });
    });

};
