const crypto = require('crypto');

exports.deriveEncryptionKey = (encrypted_master, salt) => {
  return crypto.pbkdf2Sync(encrypted_master, salt, 100000, 32, 'sha512');
};

exports.encryptPassword = (password, encryptionKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return `${iv.toString('hex')}:${encryptedPassword}`;
};

exports.decryptPassword = (encryptedPassword, encryptionKey) => {
  const [iv, encrypted] = encryptedPassword.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from(iv, 'hex'));
  let decryptedPassword = decipher.update(encrypted, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};
