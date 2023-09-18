require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https');
const crypto = require('crypto');
var cors = require('cors')

const userRoutes = require('./routes/user.js');
const passwordRoutes = require('./routes/password.js');
const refreshTokenRoutes = require('./routes/refreshToken.js');

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());

// Use the user and password routes
app.use('/user', userRoutes);
app.use('/password', passwordRoutes);

// Add the refresh token route
app.use('/token', refreshTokenRoutes);


const server = https.createServer({
  key: fs.readFileSync(process.env.HTTPS_PRIVATE_KEY_FILE), // Path to your private key
  cert: fs.readFileSync(process.env.HTTPS_CERT_KEY_FILE), // Path to your certificate
  dhparam: fs.readFileSync(process.env.DHPARAM_FILE), // Provide the generated DH parameters
  ciphers: [
    // List of ciphers that support PFS, adjust as needed
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'DHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'DHE-RSA-AES256-GCM-SHA384'
  ].join(':'),
  honorCipherOrder: true, // Ensure that the server's cipher preference is used
  secureOptions: crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_TLSv1 // Disable insecure protocols
}, app);

server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
