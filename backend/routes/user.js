const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

//username, masterPassword in body
router.post('/register', UserController.register);

//username, masterPassword in body
router.post('/login', UserController.login);

module.exports = router;
