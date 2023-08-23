const sqlite3 = require('sqlite3').verbose();

// Create a new database connection or open an existing one
const db = new sqlite3.Database('database.db');

// Create the users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      user TEXT NOT NULL,
      encrypted_master TEXT NOT NULL,
      refresh_token_issuer TEXT NOT NULL
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS encryptionSalt (
    id INTEGER PRIMARY KEY,
    encryption_salt TEXT NOT NULL
  )
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY,
      user TEXT NOT NULL,
      username TEXT NOT NULL,
      website TEXT NOT NULL,
      encrypted_password TEXT NOT NULL,
      encryption_salt_id TEXT NOT NULL,
      FOREIGN KEY (user) REFERENCES users(user)
      FOREIGN KEY (encryption_salt_id) REFERENCES encryptionSalt(id)
    )
  `);

});

module.exports = db;
