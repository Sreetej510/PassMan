const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/refresh', UserController.refreshAccessToken);

module.exports = router;